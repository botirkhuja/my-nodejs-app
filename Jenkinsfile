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
    stage('Run database container for testing') {
      agent {
        label 'ec2-agent'
      }
      steps {
        script {
          // Build Docker image from Dockerfile
          sh "docker run -d --name test-posgres -e POSTGRES_PASSWORD=local-example -e POSTGRES_DB=phones -p 5432:5432 postgres"
        }
      }
    }
    stage('Run tests') {
      agent {
        label 'ec2-agent'
      }
      steps {
        script {
          sh "docker run --rm --link test-posgres:postgres --env-file=.env.test ${IMAGE_NAME} npm test"
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
    stage('Delete deployed image') {
        agent {
          label 'ec2-agent'
        }
        steps{
          script {
            sh "docker rmi ${IMAGE_NAME}:${BUILD_NUMBER}"
            sh "docker rmi ${IMAGE_NAME}:latest"
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
        // sh 'docker rmi $(docker images -q)'
        cleanWs()
      }
    }
  }
}