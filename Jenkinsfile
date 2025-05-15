pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/Reo96/DevOps.git'
      }
    }

    stage('Build & Deploy') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d --build'
      }
    }
  }
}
