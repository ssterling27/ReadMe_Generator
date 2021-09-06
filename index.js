const { prompt } = require('inquirer')
const { writeFile, readFile } = require('fs')

let readme = ''
let restart = ''
let licenseBadge = ''
const buildReadme = () => {
  prompt([{
    type: 'input',
    name: 'title',
    message: 'Title:'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:'
  },
  {
    type: 'input',
    name: 'installationInstructions',
    message: 'Installation Instructions:'
  },
  {
    type: 'input',
    name: 'usageInformation',
    message: 'Usage Information:'
  },
  {
    type: 'input',
    name: 'contributionGuidelines',
    message: 'Contribution Guidelines:'
  },
  {
    type: 'input',
    name: 'testInstructions',
    message: 'Test Instructions'
  },
  {
    type: 'list',
    name: 'license',
    message: 'License:',
    choices: ['MIT License', 'GNU GPLv3', 'CC0-1.0', 'Mozilla Public License 2.0', 'Apache License 2.0']
  },
  {
    type: 'input',
    name: 'username',
    message: 'GitHub Username:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email Address:'
  }
  ])
    .then(({ title, description, installationInstructions, usageInformation, contributionGuidelines, testInstructions, license, username, email }) => {
      switch (license) {
        case 'MIT License':
          licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
          break
        case 'GNU GPLv3':
          licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
          break
        case 'CC0-1.0':
          licenseBadge = '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'
          break
        case 'Mozilla Public License 2.0':
          licenseBadge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
          break
        case 'Apache License 2.0':
          licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
          break
      }
      readme = `# ${title} (${licenseBadge})

  ## Table of Contents

  1. <a href="#desc">Description</a>
  2. <a href="#install">Installation Instructions</a>
  3. <a href="#usage">Usage Information</a>
  4. <a href="#contribution">Contribution Guidelines</a>
  5. <a href="#test">Test Instructions</a>
  6. <a href="#license">License</a>
  7. <a href="#questions">Questions</a>
 
  ## <a name="desc">Description</a>

  ${description}

  ##  <a name="install">Installation Instructions</a>

  ${installationInstructions}
  
  ## <a name="usage">Usage Information</a>
  
  ${usageInformation}
  
  ## <a name="contribution">Contribution Guidelines</a>

  ${contributionGuidelines}
  
  ## <a name="test">Test Instructions<a>

  ${testInstructions}
  
  ## <a name="license">License</a>

  ${license}
  
  ## <a name="questions">Questions</a>

  <a href='https://github.com/${username}'>${username}</a>
  ${email}
  `
      writeFile('ReadMe.md', `${readme}`, err => {
        if (err) { console.log(err) }
      })
      // readFile('ReadMe.md', 'utf8', (err, data) => {
      //   if (err) { console.log(err) }
      //   console.log(`Your ReadMe:
      //   ${data}`)
      // })
    })
}

const start = () => {
  prompt({
    type: 'list',
    name: 'start',
    message: 'Create a Readme?',
    choices: ['Yes', 'No']
  })
    .then(({ start }) => {
      if (start == 'Yes') {
        buildReadme()
      } else {
        console.log('OK')
      }
    })
}

start()

