# apod-bg

[![npm](https://img.shields.io/npm/v/apod-bg.svg)](https://www.npmjs.com/package/apod-bg)
[![Build Status](https://travis-ci.org/justinzelinsky/apod-bg.svg?branch=master)](https://travis-ci.org/justinzelinsky/apod-bg)
![David](https://img.shields.io/david/justinzelinsky/apod-bg)
![npm](https://img.shields.io/npm/dm/apod-bg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Requirements

- NodeJS

## Install

`npm install -g apod-bg`

## How to use

`apod-bg`

## Options

- `--apiKey <apiKey>`, `-k <apiKey>`
  - Use specific API key -- can set `APOD_API_KEY` as an environment variable
- `--endDate <YYYY-MM-DD>`
  - Specify the last possible date you want the picture chosen from (default `today`)
- `--hd <true|false>`
  - Specify whether or not you want the image in HD or not (default: `true`)
- `--help`
  - Display information about possible options
- `--location <path/to/save/file>`
  - Specify the location where you want to save the file (default: `/tmp`)
- `--startDate <YYYY-MM-DD>`
  - Specify the first possible date you want the picture randomly chosen from (default: `1995-05-16`)
- `--version`
  - Display the current version of the application

## Purpose

Randomly chooses a photo from [Astronomy Picture of the Day](http://apod.nasa.gov/apod/astropix.html) and sets it as your desktop background

## APOD API Key

Obtain an API key from the APOD website and set it as an environment variable `APOD_API_KEY` or use `--apiKey` flag.
