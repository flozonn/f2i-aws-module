resource "aws_apigatewayv2_api" "gateway" {
  name = "queuingService"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "int" {
  api_id           = aws_apigatewayv2_api.gateway.id
  integration_type = "AWS_PROXY"
  connection_type = "INTERNET"
  integration_method = "POST"
  integration_uri =aws_lambda_function.put_in_queue.invoke_arn
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = aws_apigatewayv2_api.gateway.id
  route_key = "POST /stackMessage"
  target = "integrations/${aws_apigatewayv2_integration.int.id}"
}

resource "aws_lambda_permission" "allow_lambda_invocation" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.put_in_queue.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.gateway.execution_arn}/*/*"
  statement_id  = "AllowExecutionFromAPIGateway"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.gateway.id
  name        = "prod"
  auto_deploy = true
}

output "api_endpoint" {
    value = aws_apigatewayv2_api.gateway.api_endpoint
}
output "stage_url" {
    value = aws_apigatewayv2_stage.prod.invoke_url
}