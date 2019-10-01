# LiberPrimusSolver
an attempt at solving Cicada 3301 Liber Primus

## How to run it

You need both **Node** and **Yarn**

- Clone the repository
- launch `yarn install`
- use `yarn test` to run tests
- use `yarn start` to launch the program

## How it works

the program reads an input file ( by default the unsolved pages of the Liber Primus ) and apply the translator you chose to them. Translator here means both ciphers, various operations ( e.g. shift ) and modified versions of known ciphers ( e.g. an Atbash cipher followed by a shift ). Use the config.json file to configure the program.

Each time you launch the program, **it will overwrite the previous result of the selected translator**.

Two or more txt files will be produced: one in English, another in runic ( useful if you want to apply other translators to it ).

The program logs both to console and to file.

## config.json file

Here's a brief description of the file.

#### Solver section
```
  "solver": {
    "translatorToApply": "vigenere",
    "dataFolder": "/home/x/Projects/LiberPrimusSolver/data",
    "outputDataFolder": "/home/x/Projects/LiberPrimusSolver/data/output",
    "fileToTranslate": "welcome.txt"
  }
```

"translatorToApply" must contain a valid translator name ( more on this later on )

"dataFolder" is the folder that contains the input files

"outputDataFolder" is the folder that will contain the program output

"fileToTranslate" is the input file

#### Translators section

This section contains the configuration to use for supported translators that require further configuration

Available translators are **direct, atbash, shiftedAtbash, vigenere**

### direct

it simply translates runes into english.

no configuration required

### atbash

decrypts the text using Atbash cipher

no configuration required

### shiftedAtbash

decrypts the text using Atbash cipher and  then applies a shift

~~~
    "shiftedAtbash": {
      "shiftsToPerform": [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, -2, -3, -5, -7, -11, -13, -17, -19, -23]
    }
~~~

"shiftsToPerform" is an array that contains the various shifts you want to be performed after the atbash decription.

a folder named "shiftedAtbash" will be created in your "outputDataFolder", containing a file for each shift operation you required.

### vigenere

decrypts the text using Vigenere cipher

~~~
    "vigenere": {
      "splitLiberPrimusBy": "segment",
      "keys": [{
        "key": "ᛞᛁᚢᛁᚾᛁᛏᚣ",
        "fileName": "divinity"
      }
      ]
    }
~~~

"splitLiberPrimusBy" we are using [iddqd transcription of Liber Primus](https://github.com/rtkd/iddqd/tree/master/liber-primus__transcription--master). Valid values are **word, clause, paragraph, segment, chapter, line, page**

By selecting one of them, Liber Primus will be divided into chunks; each chunks is then decrypted using Vigenere using the chosen key. This means that the key index is reset at each chunk.

"keys" is an array containing the various keys you want to decrypt the input file with. For each key, you must specify:
- **key** is the key in runic
- **fileName** the name of the file that will contain the output

files will be saved in a folder named "vigenere"
