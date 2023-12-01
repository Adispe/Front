module.exports = (on, config) => {
    // Cypress configuration options
  
    // Set base URL
    config.baseUrl = 'https://maps.googleapis.com';
  
    // Configure viewport sizes
    config.viewportWidth = 1280;
    config.viewportHeight = 720;
  
    // Configure test files to include
    config.include = ['./tests/**/*.spec.js'];
  
    // Configure test file exclusions
    config.exclude = ['./tests/slow/*.spec.js'];
  
    // Configure test retries
    config.retries = {
      runMode: 2,
      openMode: 0
    };
  
    // Configure test environment variables
    config.env = {
      apiUrl: 'https://maps.googleapis.com/maps/api',
      apiKey: 'YOUR_API_KEY'
    };
  
    // Configure plugins
    config.plugins = {
      // Add custom plugins here
    };
  
    // Return the updated configuration
    return config;
  };
  