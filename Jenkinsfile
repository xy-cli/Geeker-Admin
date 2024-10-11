@Library('pipeline-shared-library-v2@v2.0.0') _

/**
 * 1、将 Git 分支信息映射到对应的环境中，根据分支来确定对应发布环境信息；
 * 2、当检测到 Push Tag 时，则视为发布生产环境，Tag 命名要合规，否则退出；
 */

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    environment {
        NODE_PATH = tool name: 'NodeJS-18', type: 'nodejs'
        KUBECTL_PATH = tool name: 'kubectl-latest', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
        HELM_PATH = tool name: 'helm-latest', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
        DOCKER_PATH = tool name: 'docker-latest', type: 'dockerTool'
        PATH = "${NODE_PATH}:${KUBECTL_PATH}:${HELM_PATH}:${DOCKER_PATH}:${PATH}"
    }

    stages {
        stage('环境配置') {
            steps {
                notifyCommittersBuildStarted()

                determineDeploymentTierCurrent(branchMapping: [
                    'develop': constantDeploymentTierDevelopment(),
                    'test'   : constantDeploymentTierTesting(),
                    'master' : constantDeploymentTierGrayscale(),
                    '[0-9]+[.][0-9]+[.][0-9]+' : constantDeploymentTierProduction()
                ])
            }
        }

        stage('代码检查') {
            when { expression { return false } }
            steps {
                echo "# TODO ${STAGE_NAME}"
            }
        }

        stage('单元测试') {
            when { expression { return false } }
            steps {
                echo "# TODO ${STAGE_NAME}"
            }
        }

        stage('应用构建') {
            steps {
                compileCodeWithNpm(script: """
                    node --version
                    npm config set strict-ssl false

                    if [ "${variableDeploymentTierCurrent()}" = "${constantDeploymentTierDevelopment()}" ]
                    then
                        node --version
                        npm config set strict-ssl false
                        npm install -g pnpm '--registry=https://registry.npm.taobao.org'
                        pnpm install '--registry=https://registry.npm.taobao.org'
                        pnpm build:test
                    fi

                    if [ "${variableDeploymentTierCurrent()}" = "${constantDeploymentTierTesting()}" ]
                    then
                        node --version
                        npm config set strict-ssl false
                        npm install -g pnpm '--registry=https://registry.npm.taobao.org'
                        pnpm install '--registry=https://registry.npm.taobao.org'
                        pnpm build:test
                    fi

                    if [ "${variableDeploymentTierCurrent()}" = "${constantDeploymentTierGrayscale()}" ]
                    then
                        node --version
                        npm config set strict-ssl false
                        npm install -g pnpm '--registry=https://registry.npm.taobao.org'
                        pnpm install '--registry=https://registry.npm.taobao.org'
                        pnpm build:pro
                    fi

                    if [ "${variableDeploymentTierCurrent()}" = "${constantDeploymentTierProduction()}" ]
                    then
                        node --version
                        npm config set strict-ssl false
                        npm install -g pnpm '--registry=https://registry.npm.taobao.org'
                        pnpm install '--registry=https://registry.npm.taobao.org'
                        pnpm build:pro
                    fi
                """)
            }
        }

        stage('应用部署') {
            steps {
                deployHelmRelease(namespace: 'meta-internal') {
                    packageHelmChart(chart: './chart') {
                        buildContainerImage(dockerfile: './Dockerfile')
                    }
                }
            }
        }

        stage('集成测试') {
            when { expression { return false } }
            steps {
                echo "# TODO ${STAGE_NAME}"
            }
        }

        stage('应用发布') {
            when { expression { return false } }
            steps {
                echo "# TODO ${STAGE_NAME}"
            }
        }
    }

    post {
        always {
            notifyCommittersBuildResult()
        }
    }
}
