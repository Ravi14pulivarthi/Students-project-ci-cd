pipeline {
  agent any

  environment {
    DOCKER_USER = 'ravi599'
    BACKEND_IMAGE = 'student-backend'
    FRONTEND_IMAGE = 'student-frontend'
  }

  stages {

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
        }
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker build -t $DOCKER_USER/$BACKEND_IMAGE:latest Backend'
        sh 'docker build -t $DOCKER_USER/$FRONTEND_IMAGE:latest student-frontend'
      }
    }

    stage('Push Images') {
      steps {
        sh 'docker push $DOCKER_USER/$BACKEND_IMAGE:latest'
        sh 'docker push $DOCKER_USER/$FRONTEND_IMAGE:latest'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }
  }
}
