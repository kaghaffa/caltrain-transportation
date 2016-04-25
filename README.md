# Public Transportation App

## Steps for Deployment

1. `bundle install`
2. `rake bower:install` - will install all of the bower components
3. `rake db:migrate`
4. `rails server`
5. Open your browser and go to `http://localhost:3000`


## Production Notes

* JS minification is accomplished using the `uglifier` gem
* CSS minification is accomplished using the `sass-rails` gem