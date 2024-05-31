pipeline {
  environment {
    registryCredential = 'docker-botirkhuja-creds'
    dockerBuildImage = ''
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
    stage('List docker items') {
      agent {
        label 'ec2-agent'
      }
      steps {
        sh 'docker ps'
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
          dockerBuildImage = docker.build(IMAGE_NAME);
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
            dockerBuildImage.push("$BUILD_NUMBER")
            dockerBuildImage.push('latest')
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
      node('ec2-agent') {
        sh 'docker rmi $(docker images -q)'
        cleanWs()
      }
    }
  }
}