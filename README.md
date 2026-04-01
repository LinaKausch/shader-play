# Interactive Shader Project

A real-time interactive Three.js shader visualization with live parameter controls.

## Overview

This project renders an animated fractal-like shader with interactive sliders to tweak various parameters in real-time. The shader creates dynamic patterns with adjustable colors and animation behavior.

## Features

- **Real-time Rendering**: Smooth animated shader visualization using Three.js
- **Interactive Controls**: Adjust shader parameters with sliders
- **Color Control**: Customize RGB color channels independently
- **Parameter Tuning**: Modify loop count, scale, increment, and more

## File Structure

- `index.html` - Main HTML file with UI controls and import map
- `index.js` - Three.js setup and shader system
- `fragment.glsl` - Fragment shader with main visual logic
- `vertex.glsl` - Vertex shader for geometry transformation

## Controls

### Animation Parameters
- **Loop Count** - Number of iterations in the shader loop (1-50)
- **Scale** - Zoom/scale of the pattern (0.01-1)
- **Increment** - Rate of animation step (0.001-0.2)
- **Tanh Multiplier** - Intensity of the tanh function (1-100)

### Initial Values
- **Z Init X, Y, Z** - Initial vector values (0-10)

### Color Parameters
- **Color R** - Red channel multiplier (0-1)
- **Color G** - Green channel multiplier (0-1)
- **Color B** - Blue channel multiplier (0-1)
- **Brightness** - Overall brightness (0-3)

## Setup

1. Install dependencies:
```bash
npm i
```

2. Open `index.html` in a web browser

## Customization

You can modify the default values in `index.js` by changing the `uniforms` object values. Experiment with different slider ranges in `index.html` to find the effects you like.

## How It Works

The shader uses a complex mathematical formula involving loops, trigonometric functions, and matrix transformations to create the visual pattern. The vertex shader handles geometry transformation while the fragment shader computes the final color for each pixel.
