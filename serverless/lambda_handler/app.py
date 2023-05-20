import json
import random
import threading
import boto3

identifier_length = 7
table = boto3.resource('dynamodb').Table('zippit')


def generate_random_string(length: int) -> str:
    return "z" + "".join([chr(random.randint(97, 122)) for _ in range(length)])


def find_link(identifier: str) -> str:
    result = table.get_item(Key={'id': identifier})
    return result['Item']['link'] if 'Item' in result.keys() else None

def get_hits(identifier: str) -> int:
    result = table.get_item(Key={'id': identifier})
    return int(result['Item']['hits']) if 'Item' in result.keys() else None

def save_link(link: str):
    identifier = generate_random_string(identifier_length)
    table.put_item(Item=({'id': identifier, 'link': link, 'hits': 0}))
    return identifier


def increase_hits(identifier: str):
    table.update_item(Key={'id': identifier}, UpdateExpression="set hits = :val + hits", ExpressionAttributeValues={":val": 1})

    
def lambda_handler(event, context):
    resource = event['resource']
    method = event['httpMethod']

    if resource == '/health' and method == 'GET':
        return {'statusCode': 200, 'body': 'works!', 'headers': {'Content-Type': 'plain/text'}}

    if resource == '/generate' and method == 'POST':
        try:
            body = json.loads(event['body'])
            identifier = save_link(body['url'])
            return {'statusCode': 201, 'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'identifier': identifier})}
        except KeyError as e:
            print(e)
            return {'statusCode': 400}
        except Exception as e:
            print(e)
            return {'statusCode': 500}

    if resource.startswith('/urls') and method == 'GET':
        identifier = event['path'].replace('/urls/', '')
        link = find_link(identifier)
        if link:
            increase_hits(identifier)
            return {'statusCode': 302, 'headers': {'Location': link}}

    if resource.startswith('/hits') and method == 'GET':
        identifier = event['path'].replace('/hits/', '')
        hits = get_hits(identifier)
        if hits:
            return {'statusCode': 200, 'headers': {'Content-Type': 'application/json'}, 'body': json.dumps({'hits': hits})}

    return {'statusCode': 404}
