pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/YourUsername/your-repo-name.git'
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
