pipeline {
  agent any

  environment {
    BACKEND_IMAGE = "student-backend"
    FRONTEND_IMAGE = "student-frontend"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: 'https://github.com/Ravi14pulivarthi/StudentCI-CD.git'
      }
    }

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

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t $DOCKER_USER/student-backend:latest Backend'
        sh 'docker build -t $DOCKER_USER/student-frontend:latest student-frontend'
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        sh 'docker push $DOCKER_USER/student-backend:latest'
        sh 'docker push $DOCKER_USER/student-frontend:latest'
      }
    }

    stage('Deploy Application') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }
}
