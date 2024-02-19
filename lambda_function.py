import boto3
import datetime
import logging

# Initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

# Name of the DynamoDB table where the counter is stored
TABLE_NAME = 'VisitorCounterTable'

def lambda_handler(event, context):
    try:
        # Scan DynamoDB to find the maximum CounterID
        response = dynamodb.scan(
            TableName=TABLE_NAME,
            Select='COUNT',
        )
        
        # Get the maximum CounterID
        if 'Count' in response:
            max_counter_id = response['Count']
            counter_id = max_counter_id + 1
        else:
            counter_id = 1
        
        # Put a new item in DynamoDB with the incremented CounterID and DateRecorded
        today_date = datetime.datetime.now().strftime('%Y-%m-%d')
        dynamodb.put_item(
            TableName=TABLE_NAME,
            Item={
                'CounterID': {'N': str(counter_id)},
                'DateRecorded': {'S': today_date}
            }
        )
        
        # Log success message
        logger.info(f'CounterID: {counter_id} successfully added for {today_date}. Highest CounterID: {counter_id}')
        
        return f'{counter_id}'
        
        
    except Exception as e:
        # Log error message
        logger.error(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }
