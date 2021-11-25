import { proxy } from 'valtio'

// https://hannuhartikainen.fi/blog/modeling-rubiks-cube/
// [:u :f :l] [:u :l :b] [:u :b :r] [:u :r :f]              ; corners - top
// [:d :f :l] [:d :l :b] [:d :b :r] [:d :r :f]              ; corners - bottom
// [:u :f] [:u :l] [:u :b] [:u :r]                          ; edges - top
// [:f :l] [:l :b] [:b :r] [:r :f]                          ; edges - middle
// [:d :f] [:d :l] [:d :b] [:d :r]                          ; edges - bottom

const fwdRing = ['U', 'F', 'L', 'D', 'B', 'R']

const state = proxy([
  'U-F-L', 'U-L-B', 'U-B-R', 'U-R-F',
  'D-F-L', 'D-L-B', 'D-B-R', 'D-R-F',
  'U-F', 'U-L', 'U-B', 'U-R',
  'F-L', 'L-B', 'B-R', 'R-F',
  'D-F', 'D-L', 'D-B', 'D-R',
])

export default state