target "default" {
  inherits = [ "backend" ]
}

target "backend-metadata" {
}

target "backend" {
  inherits = [ "backend-metada" ]
  context = "backend"
  dockerfile = "Dockerfile"
  platforms = [ "linux/amd64", "linux/arm64" ]
}
