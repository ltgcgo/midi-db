# midi-db
🎹 Data concerning MIDI standards.

## Bitmaps
* [XG Fonts](/bitmaps/xg/font.tsv)
* [XG System](/bitmaps/xg/system.tsv)
* [XG Voices](/bitmaps/xg/voices.tsv)

## Voice Maps
See all of the [correct names](/bank/en.tsv).

### YAMAHA XG
#### Bank selection
**Table**: [xg.tsv](/bank/xg.tsv)
**Importance**: MSB PRG LSB

#### Bank categories
* `000`: Melodic Voices
* `061`: KORG Drum Kits
* `064`: XG SFX Voices
* `120`: GS/GM2 Drum Kits
* `126`: XG SFX Kits
* `127`: XG Drum Kits

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
**Importance**: LSB PRG MSB

#### Bank categories
* `000`: GS standard
* `001`: Roland SC-55 map
* `002`: Roland SC-88 map
* `003`: Roland SC-88 Pro map

#### Compatibility
##### Devices
* MT-32
* SC-55
* SC-88
* SC-88 Pro

##### Standard
* General MIDI
* General MIDI 2

### KORG NS5R
#### Bank selection
**Table**: [ns5r.tsv](/bank/ns5r.tsv)
**Importance**: MSB PRG LSB

#### Bank categories
(As of KORG NS5R and later, all synth modules support GS and XG voice maps.)
* `000`: Melodic Voices
* `056`: KORG GM-b
* `061`: KORG Drum Kits
* `081`: KORG 05R/W map
* `082`: KORG ProgB
* `083`: KORG ProgC
* `089`: KORG CmbA
* `090`: KORG CmbB
* `091`: KORG CmbC 

#### Compatibility
##### Devices
* 05R/W
* NS5R
* NX5R

##### Standard
* General MIDI