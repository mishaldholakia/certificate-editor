# certificate-editor
This repo can be used to create certificate pdf's. It can be used by printing services. Modify the template pdf to process new certificate. Make sure to update the .env file. 


## Installation
Requires nodejs
```
> git clone https://github.com/mishaldholakia/certificate-editor
> npm install

```
## Modify the config file
Configure .env file to modify the contents. Default values:
```
# template file you need modified.
template = 'template.pdf'

# file to pull the list of names in csv. Make sure the the first column is header name (Name).
names = 'names.csv'

# Location of the text with respect to template file.
x = 327.641

# Location of the text with respect to template file.
y = 209.058

# Font type. It does not have all the IBM fonts. Please reach out to Mishal if you need additional fonts. 
font ='arial'

# Font size
fontSize = '36'

# Font color in hex code. 
fontColor = '#000000'
```
## Run
Start the server
```
> npm start
```
