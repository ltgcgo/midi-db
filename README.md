# midi-db
🎹 Data concerning MIDI standards.

## Bitmaps
* [XG Fonts](/bitmaps/xg/font.tsv) _(design based on established systems, CC0 where applicable)_
* [XG System](/bitmaps/xg/system.tsv)
* [XG Voices](/bitmaps/xg/voices.tsv)

## Fields
### ID maps
ID maps are TSV files.

* `MSB` defines the cc0 (bank MSB) value of the voice.
* `PRG` defines the PC (program change) value of the voice.
* `LSB` defines the cc32 (bank LSB) value of the voice.
* `NME` defines the 8-character ID of the voice.
* `ELC` defines the element count (minus one) of the voice.
  * When set to `0`, the voice takes up one element. `1` for two, `2` for three, the same goes on.
  * When set to `16`, the voice is treated as a drum kit.
  * When set to `17`, the voice is treated as a voice menu.
  * Any value above is not defined.
* `DRM` defines the drum map ID used. Can also be used by voice menus.

### Drum maps
Drum maps are custom script files.

* `drm` defines the current drum map ID to write to.
  * e.g. `drm xgStdKit` switches to `xgStdKit`.
* `nno` defines the current drum note number to write to.
  * e.g. `nno 39` switches to `39`.
* `deg` sets the exclusive group (aka. alternate assign) of the current note number. Defaults to `0` (disabled).
* `nec` sets the note element count of the current note number. Defaults to `1`.
* `dcp` copies parameters from a set drum kit.
  * e.g. `dcp xgStdKit` copies parameters from `xgStdKit` to the current drum kit.

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
- [x] `048`: MU100 Model Exclusive Voices
- [x] `064`: XG SFX Voices
- [x] `126`: XG SFX Kits
- [x] `127`: XG Drum Kits
- [x] `125` (LSB): (redirected from `127`) MU100 Native

#### Compatibility
##### Device
* TG100
* TG300
* QY10
* QY70
* QY100
* S-YXG50
* S-YXG70
* S-YXG100
* S-YXG2006
* MU5
* MU50
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
- [x] `004`: Roland SC-8850 map
- [x] `120` (MSB): Roland GS Drum Kits
- [x] `126`: Roland MT-32 alternate map
- [x] `127`: Roland MT-32 main map

#### Compatibility
##### Devices
* MT-32
* CM-64
* SC-55
* SC-88
* SC-88 Pro
* SC-8850
* AKAI SG01k

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

### Roland SD
#### Bank selection
**Table**: [sd.tsv](/bank/sd.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [x] `080`: Special Set 1
- [x] `081`: Special Set 2
- [x] `096`: Classical Set Melodic (GM2 Melodic Voices, redirected to MSB 121 and relies on `gm2.tsv`)
- [x] `097`: Contemporary Set Melodic
- [x] `098`: Solo Set Melodic
- [x] `099`: Enhanced Set Melodic
- [x] `104`: Classical Set Drums (GM2 Drum Kits, redirected to MSB 120 and relies on `gm2.tsv`)
- [x] `105`: Contemporary Set Drums
- [x] `106`: Solo Set Drums
- [x] `107`: Enhanced Set Drums

#### Compatibility
##### Devices
* Roland SD-20
* Roland SD-80
* Roland SD-90

### KAWAI GMega
#### Bank selection
**Table**: [gmega.tsv](/bank/gmega.tsv)

**Importance**: MSB **LSB** PRG

#### Bank categories
- [x] `004`: SP Bank _(MT-32 compatible)_
- [x] `007`: LX Bank

#### Compatibility
##### Devices
* KAWAI GMega
* KAWAI GMega LX
* KAWAI K11

### AKAI SG
#### Bank selection
**Table**: [sg.tsv](/bank/sg.tsv)

**Importance**: LSB PRG **MSB**

#### Bank categories
- [ ] `001`: Bank 01 (SG01v)
- [x] `008`: Bank 08 (SG01k)

#### Compatibility
##### Devices
* AKAI SG01k
* AKAI SG01v

### YAMAHA PLG-150AN
#### Bank selection
**Table**: [plg-150an.tsv](/bank/plg-150an.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [ ] `036`: PLG-150AN Preset (redirect to LSB 005-007 from LSB 000-002)
- [x] `100`: PLG-150AN

### YAMAHA PLG-150DR/PC
#### Bank selection
**Table**: [plg-150dr.tsv](/bank/plg-150dr.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [x] `095`: PLG-150DR/PC

### YAMAHA PLG-150DX
#### Bank selection
**Table**: [plg-150dx.tsv](/bank/plg-150dx.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [ ] `035`: PLG-150DX Preset (redirect to LSB 005-007 from LSB 000-002)
- [x] `067`: PLG-150DX SFX
- [x] `099`: PLG-150DX Voices

### YAMAHA PLG-150PF/AP
#### Bank selection
**Table**: [plg-150pf.tsv](/bank/plg-150pf.tsv)

**Importance**: **MSB** PRG LSB

#### Bank categories
- [x] `032`: PLG-150AP Preset (redirect to LSB 005 from LSB 001)
- [x] `096`: PLG-150PF/AP

### YAMAHA PLG-150VL
#### Bank selection
**Table**: [plg-150vl.tsv](/bank/plg-150vl.tsv)

**Importance**: **MSB** LSB PRG

#### Bank categories
- [x] `033`: PLG-150VL Preset (redirect to LSB 005-008 from LSB 000-003)
- [x] `097`: PLG-150VL / SONDIUS-XG

### YAMAHA PLG-100SG
#### Bank selection
**Table**: [plg-100sg.tsv](/bank/plg-100sg.tsv)

**Importance**: **MSB** LSB PRG

#### Bank categories
- [x] `098`: PLG-100SG

### KORG KROSS 2
#### Bank selection
**Table**: [kross.tsv](/bank/kross.tsv)

**Importance**: MSB LSB PRG

#### Bank categories
All occupy MSB `063`. Listed values are LSB values.
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

### Yamaha S90 ES / Motif ES
#### Bank selection
**Table**: [s90es.tsv](/bank/s90es.tsv)

**Importance**: MSB LSB PRG

#### Bank categories
All occupy MSB `063`. Listed values are LSB values.
- [x] `017` _(mapped from `000`)_ S90 ES Preset 1
- [x] `018` _(mapped from `001`)_ S90 ES Preset 2
- [x] `019` _(mapped from `002`)_ S90 ES Preset 3
- [x] `020` _(mapped from `003`)_ S90 ES Preset 4
- [x] `021` _(mapped from `008`)_ User 1
- [x] `022` _(mapped from `009`)_ User 2
- [x] `023` _(mapped from `032`)_ Preset Drums
- [x] `024` _(mapped from `040`)_ User Drums
- [x] `025`-`027` _(mapped from `024`-`026`)_ Plug User A/B/C _(reserved)_
- [ ] `028` _(mapped from `000`)_ Motif ES Preset 1
- [ ] `029` _(mapped from `001`)_ Motif ES Preset 2
- [ ] `030` _(mapped from `002`)_ Motif ES Preset 3
- [ ] `031` _(mapped from `003`)_ Motif ES Preset 4
- [ ] `032` _(mapped from `004`)_ Motif ES Preset 5
- [ ] `033` _(mapped from `005`)_ Motif ES Preset 6