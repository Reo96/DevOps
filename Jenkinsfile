pipeline {
    agent any
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
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
                echo 'Verify stage'
            }
        }
    }
}
