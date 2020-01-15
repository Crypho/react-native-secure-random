require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-secure-random"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-secure-random
                   DESC
  s.homepage     = "https://github.com/Crypho/react-native-secure-random"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Yiorgis Gozadinos" => "ggozad@crypho.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/Crypho/react-native-secure-random.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end
