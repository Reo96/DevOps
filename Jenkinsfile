pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Repository cloned by Jenkins'
            }
        }

        stage('Build and Run') {
            steps {
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
