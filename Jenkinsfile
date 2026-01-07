pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'ravi599'
    BACKEND_IMAGE = 'student-backend'
    FRONTEND_IMAGE = 'student-frontend'
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: 'https://github.com/Ravi14pulivarthi/Students-project-ci-cd.git'
        echo 'Code checkout completed'
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

    stage('Deploy to AWS') {
      steps {
        sh '''
        ssh -i /var/jenkins_home/cd-key.pem ubuntu@3.107.14.27 << EOF
          cd student-app
          docker-compose pull
          docker-compose up -d
        EOF
        '''
      }
    }
  }

  post {
    success {
      echo 'CI + CD SUCCESSFULLY COMPLETED!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
