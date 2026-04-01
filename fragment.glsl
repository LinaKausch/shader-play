uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float loopCount;
uniform float scale;
uniform float increment;
uniform float tanh_mul;
uniform float z_init_x;
uniform float z_init_y;
uniform float z_init_z;
uniform float colorR;
uniform float colorG;
uniform float colorB;
uniform float brightness;

void main()
{
    vec2 u = gl_FragCoord.xy;
    vec4 o;
    
    vec2 v = iResolution.xy;
         u = scale*(u+u-v)/v.y;    
         
    vec4 z = o = vec4(z_init_x, z_init_y, z_init_z, 0.);
     
    for (float a = .5, t = iTime, i; 
         ++i < loopCount; 
         o += (1. + cos(z+t)) 
            / length((1.+i*dot(v,v)) 
                   * sin(1.5*u/(.5-dot(u,u)) - 9.*u.yx + t))
         )  
        v = cos(++t - 7.*u*pow(a += increment, i)) - 5.*u, 
        // use stanh here if shader has black artifacts
        //   vvvv
        u += tanh(tanh_mul * dot(u *= mat2(cos(i + .02*t - z.wxzw*11.))
                           ,u)
                      * cos(1e2*u.yx + t)) / 2e2
           + .2 * a * u
           + cos(4./exp(dot(o,o)/1e2) + t) / 3e2;
              
     o = 25.6 / (min(o, 13.) + 164. / o) 
       - dot(u, u) / 250.;
     
    // Apply color multiplier
    float r = o.x * colorR;
    float g = o.y * colorG;
    float b = o.z * colorB;
    
    gl_FragColor = vec4(r, g, b, 1.0) * brightness;
}