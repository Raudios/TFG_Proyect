# Utiliza una imagen oficial de OpenJDK como imagen base
FROM openjdk:11-jdk

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el directorio completo del proyecto en el contenedor en /app
COPY . /app

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8761

# Instala Maven si es necesario
RUN apt-get update && apt-get install -y maven

# Ejecuta la aplicación usando Maven
CMD ["mvn", "spring-boot:run"]
