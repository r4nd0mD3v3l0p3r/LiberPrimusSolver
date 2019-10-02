# LiberPrimusSolver
an attempt at solving Cicada 3301 Liber Primus

## How to run it

You need both [Node](https://nodejs.org/en/) and 
[Yarn](https://yarnpkg.com/lang/en/)

- Clone the repository
- launch `yarn install`
- use `yarn start` to launch the program
- use `yarn test` to run tests

## How it works

Liber Primus Solver (LPS from now on) at the moment can apply various cipher methods to runic text
coming from Liber Primus, and generate output files that contain the result of the operation performed
in both runic and english.

It can apply ciphers in sequence (making it possible to solve the 
First Koan that was translated using Atbash and then Caesar ciphers in sequence).

## How to configure it

the **data** folder contains various txt files.

aWarning.txt, firstKoan.txt, welcome.txt and unsolved.txt are excerpts from the
Liber Primus. First three files contain the sections that were decrypted, while
unsolved.txt contains all the pages that have yet to be decrypted.

LPS uses [iddqd transcription of Liber Primus](https://github.com/rtkd/iddqd/tree/master/liber-primus__transcription--master).

output files will be placed into a folder named output, that will be created in
data folder as soon as the program is launched.

## The tasks.txt file

Tasks.txt is the file used to program LPS. Each row should be valid JSON,
and represents a task that LPS will execute.

The general form of a line is as follows:
```json
{"inputFileName":"aWarning.txt", "outputFileName": "atbash", "pipeline":[{"cipher":"atbash"}]}
```

- inputFileName is the file the task will use as input (it must be an excerpt
from Liber Primus that follows the transcription rules mentioned above)
- outputFileName is the name of the file that will contain the task outcome.
Two files will be generated, one outputFileName.rune.txt containing the result
in runes, another outputFileName.txt containing plain english. At the moment,
runes with multiple possible translations (eg ᛋ that translates
 both into S and Z) will be written with both values enclosed in square brakets.
 An example from the First Koan: ᚹ-ᚣᛠᚹᛟ will appear as A-[C,K]OAN
 Future version will handle this situations in a better way.
- pipeline this contains the list of ciphers that will be applied to the input
file. They should appear in the order you want them to be executed.

some examples

**Task that applies Atbash and then Caesar cipher**
```json
{"inputFileName":"firstKoan.txt", "outputFileName": "atbashThenShift", "pipeline":[{"cipher":"atbash"}, {"cipher":"shift", "by":"3"}]}
```

## Supported ciphers

### direct

it simply translates runes into english.

task example:

```json
{"inputFileName":"someInputFile.txt", "outputFileName": "someOutputFile", "pipeline":[{"cipher":"direct"}]}
```

### Atbash

it decrypts the text using Atbash

task example:

```json
{"inputFileName":"someInputFile.txt", "outputFileName": "someOutputFile", "pipeline":[{"cipher":"atbash"}]}
```

### Caesar cipher (shift cipher)

it decrypts the text using Caesar cipher. You must specify the shift value.

task example:
```json
{"inputFileName":"someInputFile.txt", "outputFileName": "someOutputFile", "pipeline":[{"cipher":"shift", "by":"3"}]}
```

### Vigenere

it decrypts the text using Vigenere cipher. You must specify:

- the key to use (use runic alphabeth)
- how the input text should be splitted. 
Valid values are **word, clause, paragraph, segment, chapter, line, page**.
These names come from [iddqd transcription of Liber Primus](https://github.com/rtkd/iddqd/tree/master/liber-primus__transcription--master).
Segment is probably the most useful one.

task example:
```json
{"inputFileName":"welcome.txt","outputFileName": "vigenere", "pipeline":[{"cipher":"vigenere", "key":"ᛞᛁᚢᛁᚾᛁᛏᚣ", "splitBy":"segment"}]}
```

## Other things

LPS is written in Javascript because it started as a quick code
experiment to verify an ipothesys. When JS becomes unpractical or slow, it will be replaced.

Future versions will handle more ciphers, check if the output file contains
valid english, and... who knows :)