const fs = require('fs');

// 1. PropertyViews.tsx
let propCode = fs.readFileSync('src/views/PropertyViews.tsx', 'utf8');
propCode = propCode.replace("import React, { useState } from 'react';\nimport React from 'react';", "import React, { useState } from 'react';");
propCode = propCode.replace("import { Button, Badge, IconButton, Pagination } from '../components/ui';", "import { Button, Badge, IconButton, Pagination, Modal } from '../components/ui';");
fs.writeFileSync('src/views/PropertyViews.tsx', propCode);

// 2. TaskViews.tsx
let taskCode = fs.readFileSync('src/views/TaskViews.tsx', 'utf8');
taskCode = taskCode.replace("import React, { useState } from 'react';\nimport React from 'react';", "import React, { useState } from 'react';");
taskCode = taskCode.replace("import { Button, Badge, PriorityBadge, Pagination } from '../components/ui';", "import { Button, Badge, PriorityBadge, Pagination, Modal } from '../components/ui';");
fs.writeFileSync('src/views/TaskViews.tsx', taskCode);

