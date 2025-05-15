pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Cloning GitHub Repo'
                checkout scm
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                echo 'Building Docker Containers...'
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
