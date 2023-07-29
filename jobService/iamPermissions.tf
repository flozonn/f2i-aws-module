resource "aws_iam_role" "add_job_role" {
  name = "add_job_role"

  assume_role_policy = <<POLICY
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    }
    POLICY
}
resource "aws_iam_role" "write_to_dynamo_role" {
  name = "write_to_dynamo_role"

  assume_role_policy = <<POLICY
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    }
    POLICY
}
resource "aws_iam_role" "write_to_s3_role" {
  name = "write_to_s3_role"

  assume_role_policy = <<POLICY
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    }
    POLICY
}
resource "aws_iam_policy" "dynamodb_policy" {
  name        = "add_job_role_dynamodb_policy"
  description = "Permissions to write and read DynamoDB jpb_table"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    
    {
      "Sid": "WriteAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:eu-west-3:830262831474:table/job_table"
    },
    {
      "Sid": "ReadAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem"
      ],
      "Resource": "arn:aws:dynamodb:eu-west-3:830262831474:table/job_table"
    },
     {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents"
      ],
      "Resource": "arn:aws:logs:eu-west-3:830262831474:log-group:/aws/lambda/add_job:*"
    }
    ]}
POLICY
}
resource "aws_iam_policy" "dynamodb_content_policy" {
  name        = "write_to_dynamo_role_dynamodb_policy"
  description = "Permissions to write and read DynamoDB content_table"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      { "Sid": "StreamRead",
        "Effect": "Allow",
          "Action": [
            "dynamodb:GetRecords",
            "dynamodb:GetShardIterator",
            "dynamodb:DescribeStream",
            "dynamodb:ListStreams"
          ],
          "Resource":"arn:aws:dynamodb:eu-west-3:830262831474:table/job_table/stream/2023-07-28T17:06:02.048"
        },
    {
      "Sid": "WriteAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:eu-west-3:830262831474:table/content_table"
    },
    {
      "Sid": "ReadAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem"
      ],
      "Resource": "arn:aws:dynamodb:eu-west-3:830262831474:table/content_table"
    },
     {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents"
      ],
      "Resource": "arn:aws:logs:eu-west-3:830262831474:log-group:/aws/lambda/write_to_dynamo:*"
    }
    
    ]}
POLICY
}

resource "aws_iam_policy" "s3Write_policy" {
  name        = "write_to_s3_role_dynamodb_policy"
  description = "Permissions to write and write and read from S3 bucket"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      { "Sid": "StreamRead",
        "Effect": "Allow",
          "Action": [
            "dynamodb:GetRecords",
            "dynamodb:GetShardIterator",
            "dynamodb:DescribeStream",
            "dynamodb:ListStreams"
          ],
          "Resource":"arn:aws:dynamodb:eu-west-3:830262831474:table/job_table/stream/2023-07-28T17:06:02.048"
        },
   
{ 
        "Sid": "AllObjectActions",
        "Effect": "Allow",
        "Action": "s3:*Object",
        "Resource": ["${aws_s3_bucket.content_bucket.arn}/*"]
    },
     {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents"
      ],
      "Resource": "arn:aws:logs:eu-west-3:830262831474:log-group:/aws/lambda/write_to_s3:*"
    }
    
    ]}
POLICY
}
resource "aws_iam_role_policy_attachment" "dynamodb_attachment" {
  role       = aws_iam_role.add_job_role.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}
resource "aws_iam_role_policy_attachment" "dynamodb_content_attachment" {
  role         = aws_iam_role.write_to_dynamo_role.name
  policy_arn   =  aws_iam_policy.dynamodb_content_policy.arn
}
resource "aws_iam_role_policy_attachment" "write_s3_attachment" {
  role         = aws_iam_role.write_to_s3_role.name
  policy_arn   =  aws_iam_policy.s3Write_policy.arn
}


