pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'your_dockerhub_username'
    BACKEND_IMAGE = 'student-backend'
    FRONTEND_IMAGE = 'student-frontend'
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: 'https://github.com/yourusername/your-repo.git'
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest Backend'
        sh 'docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest student-frontend'
      }
    }

    stage('Security Scan') {
      steps {
        sh 'trivy image $DOCKERHUB_USER/$BACKEND_IMAGE:latest'
      }
    }

    stage('Push Images') {
      steps {
        sh 'docker push $DOCKERHUB_USER/$BACKEND_IMAGE:latest'
        sh 'docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:latest'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }
}
