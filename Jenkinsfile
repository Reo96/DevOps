pipeline {
  agent any

  environment {
    DOCKER_BUILDKIT = '1'
    COMPOSE_DOCKER_CLI_BUILD = '1'
  }

  stages {
    stage('Clone Repo') {
      steps {
        echo 'Repository cloned by Jenkins'
      }
    }

    stage('Build and Run') {
      steps {
        sh 'docker --version'
        sh 'docker-compose --version'
        sh 'docker-compose down'
        sh 'docker-compose up -d --build'
      }
    }

    stage('Verify') {
      steps {
        sh 'docker ps'
      }
    }
  }
}
