import { Duration } from "aws-cdk-lib";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { IQueue, Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";


interface SwnQueueProps {
    consumer: IFunction;
}

export class SwnQueue extends Construct {
    
    public readonly orderQueue: IQueue;

    constructor(scope: Construct, id: string, props: SwnQueueProps) {
        super(scope, id);

        this.orderQueue = new Queue(this, 'QrderQueue', {
            queueName: 'OrderQueue',
            visibilityTimeout: Duration.seconds(30)
        });

        props.consumer.addEventSource(new SqsEventSource(this.orderQueue, {
            batchSize: 1
        }));
    }

}