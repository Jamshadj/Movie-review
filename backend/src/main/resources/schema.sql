spring:
   datasource:
      url: jdbc:mysql://localhost:3306/movie_review_db?createDatabaseIfNotExist=true
      username: root
      password: password
      driver-class-name: com.mysql.cj.jdbc.Driver
 jpa:
      hibernate:
      ddl-auto: create