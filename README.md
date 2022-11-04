# midi-db
🎹 Data concerning MIDI standards.

## Bitmaps
* [XG Fonts](/bitmaps/xg/font.tsv) _(design based on established systems, CC0 where applicable)_
* [XG System](/bitmaps/xg/system.tsv)
* [XG Voices](/bitmaps/xg/voices.tsv)

## Voice Maps
See all of the [correct names](/bank/en.tsv).

Major maps contains Yamaha-ish voice/kit IDs, not actual names. Actual names for devices require additional maps.

Blank names can either mean placeholder or silence.

### General MIDI
#### Bank selection
**Table**: [gm.tsv](/bank/gm.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [x] `000`: Melodic Voices

### General MIDI rev. 2
#### Bank selection
**Table**: [gm2.tsv](/bank/gm2.tsv)

**Importance**: **MSB** PRG LSB
#### Bank categories
- [x] `120`: Drum Kits
- [x] `121`: Melodic Voices

### YAMAHA XG
#### Bank selection
**Table**: [xg.tsv](/bank/xg.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [x] `000`: Melodic Voices
- [ ] `048`: MU-100 Extension
- [x] `064`: XG SFX Voices
- [x] `126`: XG SFX Kits
- [x] `127`: XG Drum Kits

#### Compatibility
##### Device
* QY70
* QY100
* MU80
* MU90
* MU100
* MU128
* MU500
* MU1000
* MU2000

##### Standard
* General MIDI

### Roland GS
#### Bank selection
**Table**: [gs.tsv](/bank/gs.tsv)

**Importance**: **LSB** PRG MSB

#### Bank categories
- [x] `001`: Roland SC-55 map
- [x] `002`: Roland SC-88 map
- [x] `003`: Roland SC-88 Pro map
- [ ] `004`: Roland SC-8850 map
- [x] `120` (MSB): Roland GS Drum Kits
- [x] `126`: Roland MT-32 alternate map
- [x] `127`: Roland MT-32 main map

#### Compatibility
##### Devices
* MT-32
* SC-55
* SC-88
* SC-88 Pro
* SC-8850

##### Standard
* General MIDI
* General MIDI 2

### KORG NS5R
#### Bank selection
**Table**: [ns5r.tsv](/bank/ns5r.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
(As of KORG NS5R and later, all synth modules support GS and XG voice maps.)
- [x] `000`: Melodic Voices
- [x] `056`: KORG AG-10 map: _GM-b_
- [x] `061`: KORG Drum Kits
- [x] `062`: KORG X5D(R) & AG-10 Drum Kits
- [x] `080`: KORG ProgU _(reserved)_
- [x] `081`: KORG 05R/W map: _ProgA_
- [x] `082`: KORG X5D(R): _ProgB_
- [x] `083`: KORG ProgC
- [x] `088`: KORG CmbU _(reserved)_
- [x] `089`: KORG CmbA
- [x] `090`: KORG CmbB
- [x] `091`: KORG CmbC

#### Compatibility
##### Devices
* 05R/W
* AG-10
* X5D
* NS5R
* NX5R

##### Standard
* General MIDI

### KAWAI GMega
#### Bank selection
**Table**: [gmega.tsv](/bank/gmega.tsv)

**Importance**: MSB **LSB** PRG

#### Bank categories
- [ ] `004`: SP Bank _(MT-32 compatible?)_
- [ ] `007`: LX SP Bank

#### Compatibility
##### Devices
* KAWAI GMega
* KAWAI GMega LX
* KAWAI K11

### AKAI SG
#### Bank selection
**Table**: [sg.tsv](/bank/sg.tsv)

**Importance**: LSB **MSB** PRG

#### Bank categories
- [ ] `001`: Bank 01

#### Compatibility
##### Devices
* AKAI SG01v

### KORG KROSS 2
#### Bank selection
**Table**: [ns5r.tsv](/bank/ns5r.tsv)

**Importance**: MSB LSB PRG

#### Bank categories
All occupies MSB `063`. Listed values are LSB values.
- [ ] `000` ProgA
- [ ] `001` ProgB
- [ ] `002` ProgC
- [ ] `003` ProgD
- [ ] `004` ProgE
- [ ] `005` ProgF
- [x] `006`-`009` ProgUA/B/C/D _(reserved)_
- [ ] `010` _(mapped from `000`)_ CombA
- [ ] `011` _(mapped from `001`)_ CombB
- [ ] `012` _(mapped from `002`)_ CombC
- [x] `013`-`016` _(mapped from `003`-`006`)_ CombUA/B/C/D _(reserved)_