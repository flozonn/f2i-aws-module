resource "aws_iam_role" "role" {
  name = "LambdaBonjourRole"

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
  name        = "DynamoDBPolicy"
  description = "Permissions to write and read DynamoDB table"

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
      "Resource": "arn:aws:dynamodb:eu-west-3:830262831474:table/randomTable"
    },
    {
      "Sid": "ReadAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem"
      ],
      "Resource": "arn:aws:dynamodb:eu-west-3:830262831474:table/randomTable"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "dynamodb_attachment" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}
resource "aws_lambda_function" "sendBonjour" {
  filename         = "${path.module}/lambda_code/sendBonjour.js.zip"
  function_name    = "sendBonjour"
  role             = "${aws_iam_role.role.arn}"
  handler          = "sendBonjour.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/sendBonjour.js.zip")}"
  environment {
    variables = {
    }
  }
}