pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'ravi599'
    BACKEND_IMAGE = 'student-backend'
    FRONTEND_IMAGE = 'student-frontend'
  }

  stages {
    stage('Build Images') {
      steps {
        sh 'docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest Backend'
        sh 'docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest student-frontend'
      }
    }

    stage('Push Images') {
      steps {
        sh 'docker push $DOCKERHUB_USER/$BACKEND_IMAGE:latest'
        sh 'docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:latest'
      }
    }
  }
}
