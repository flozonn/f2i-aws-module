resource "aws_dynamodb_table" "job_table" {
  name         = "job_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "jobType"
    type = "S"
  }
  stream_view_type  = "NEW_IMAGE"
  stream_enabled = true
   global_secondary_index {
    name               = "GSI-JobType"
    hash_key           = "jobType"
    projection_type    = "ALL"  
    non_key_attributes = []     
  }
}

resource "aws_dynamodb_table" "content_table" {
  name         = "content_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }

}
