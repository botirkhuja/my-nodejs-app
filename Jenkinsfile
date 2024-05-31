pipeline {
  environment {
    registryCredential = 'docker-botirkhuja-creds'
    IMAGE_NAME = 'botirkhuja/node-express-app'
  }
  agent any
  stages {
    stage('List items') {
      agent {
        label 'ec2-agent'
      }
      steps {
        sh 'ls'
      }
    }
    stage('Build Docker Image') {
      agent {
        label 'ec2-agent'
      }
      steps {
        script {
          // Build Docker image from Dockerfile
          sh "docker build -f dockerfile -t ${IMAGE_NAME} ."
        }
      }
    }
    stage('Deploy Image') {
      agent {
        label 'ec2-agent'
      }
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("$BUILD_NUMBER")
            dockerImage.push('latest')
          }
        }
      }
    }
  }
  post {
    success {
      echo 'Build completed successfully.'
    }
    failure {
      echo 'Build failed.'
    }
    always {
      sh 'docker rmi $(docker images -q)'
      cleanWs()
    }
  }
}