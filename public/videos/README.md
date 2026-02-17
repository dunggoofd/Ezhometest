# Video Assets Guide

This directory contains all video assets for the Compression Sofa website.

## Video Files

### Hero Videos
- `hero-mobile.mp4` - Mobile-optimized hero video (640x800, portrait)
- `hero-desktop.mp4` - Desktop hero video (1920x1080, landscape)

## Video Specifications

### Encoding
- Codec: H.264 (MP4)
- Quality: CRF 23 for balanced quality/size
- Audio: None (muted background videos)

### Optimization
- Mobile video: 
  - Resolution: 640x800 (portrait)
  - Bitrate: 1-2 Mbps
  - Target size: < 5MB for quick loading on mobile
  
- Desktop video:
  - Resolution: 1920x1080 (landscape)
  - Bitrate: 3-5 Mbps
  - Target size: < 15MB

### Best Practices
1. Keep videos under 30 seconds
2. Show product in action (unboxing, assembly, use)
3. Use compressed formats (H.264)
4. Provide poster images for faster initial render
5. Set videos to autoplay, loop, and mute
6. Use `playsInline` attribute for mobile

## Creating Videos

### Example FFmpeg Command

Convert and compress video:
```bash
ffmpeg -i input.mov -vcodec h264 -acodec aac -crf 23 -preset slow output.mp4
```

Create mobile version (portrait):
```bash
ffmpeg -i input.mp4 -vf "scale=640:800:force_original_aspect_ratio=decrease,pad=640:800:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset slow hero-mobile.mp4
```

Create desktop version (landscape):
```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset slow hero-desktop.mp4
```

## Video Content Ideas

1. **Product Unboxing** - Show compact packaging
2. **Assembly Process** - 10-minute assembly timelapse
3. **Product Features** - Highlight quality materials
4. **Lifestyle Scenes** - Sofa in beautiful living spaces
5. **Customer Testimonials** - Real customers sharing experiences

## Placeholder Videos

For development/testing, you can use:
- Local placeholder: Create solid color video
- Or link to external CDN during development

Example solid color video creation:
```bash
ffmpeg -f lavfi -i color=c=gray:s=1920x1080:d=10 -c:v libx264 -crf 23 placeholder.mp4
```
