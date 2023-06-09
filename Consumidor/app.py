import requests
from kafka import KafkaConsumer
import json
import time

# Configuración del consumidor de Kafka
bootstrap_servers = ['kafka:9092']
topic_name = 'games'
group_id = 'mi_grupo' #En este caso de mmomento no lo estamos utilizando

#Tiempo de espera para evitar errores al intentar conectarse 
time.sleep(60)


consumer = KafkaConsumer(
    topic_name,
    bootstrap_servers=['kafka:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    auto_commit_interval_ms= 1000,
    group_id='greenlake-checker-group'
)

# Consumir mensajes de Kafka
for message in consumer:
    # Serializar los datos en formato JSON, lo recibimos en bytes
    print(message.value.decode())
    json_string_decoded = message.value.decode("utf-8")
    
    #Hacer la petición POST
    json_data = json.loads(json_string_decoded)
    response = requests.post('http://consumidor-base:4002/save_games', json=json_data)
    print(response)
    
    time.sleep(60)