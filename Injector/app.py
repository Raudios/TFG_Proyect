import requests
from kafka import KafkaProducer
import json
import time

##########################################################################################################################
# INJECCION A KAFKA
##########################################################################################################################

def aniadir(juegos):
    # Configurar el productor de Kafka
    producer = KafkaProducer(bootstrap_servers=['kafka:9092'])

    # Serializar los datos en formato JSON
    serialized_data = json.dumps(juegos).encode('utf-8')

    # Enviar los datos a Kafka
    print(serialized_data)
    producer.send('games', serialized_data)

    # Cerrar el productor de Kafka
    producer.close()

##########################################################################################################################
# PETICION API EXTERNA
##########################################################################################################################


# pausa la ejecución por 120 segundos, que es igual a 2 minutos
time.sleep(120)

#Bucle que pide juegos con todas las letras del abcedario y llama a la funcion que lo injecta en kafka
for i in range(ord('A'), ord('Z') + 1):
    letter = chr(i)

    url = "https://steam2.p.rapidapi.com/search/" + letter + "/page/1"

    headers = {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "9a17eb8243msh97cb55bfa67f0dep1a95dajsna2cd15908c23",
        "X-RapidAPI-Host": "steam2.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    aniadir(response.json())
    time.sleep(60)

