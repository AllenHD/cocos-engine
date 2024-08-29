# GFX总结

## 1、GFX是什么

GFX是一个抽象层，目的是统一底图形层接口，暴露给上层使用。

![WX20240814-210409@2x](/Users/elex-mb0203/Engine/cocoscreator/cocos-engine-learn/cocos/gfx/doc/src/WX20240814-210409@2x.png)

## 2、GFX中的抽象概念

![WX20240814-211608@2x](/Users/elex-mb0203/Engine/cocoscreator/cocos-engine-learn/cocos/gfx/doc/src/WX20240814-211608@2x.png)
上图：左侧为抽象类，右侧是GFXObjectType对抽象类的枚举。与[Vulkan]([首页 |武尔坎 |跨平台 3D 图形 (vulkan.org)](https://www.vulkan.org/))接口类相似。意思就是图形API通用接口。

define.ts 文件中就是对GFX 的各种定义。

#### ChatGPT的总结
GitHub Copilot
define.ts 文件定义了许多枚举类型和类，这些类型和类主要用于图形编程和设备能力描述。以下是详细总结：

##### **枚举类型**

- ObjectType: 定义了各种对象类型，如缓冲区、纹理、渲染通道等。
- Status: 定义了对象的状态，如未准备好、失败、成功。
- API: 定义了支持的图形API，如GLES2、GLES3、Metal、Vulkan等。
- SurfaceTransform: 定义了表面变换类型，如旋转90度、180度等。
- Feature: 定义了设备支持的特性，如实例化数组、多重渲染目标等。
- Format: 定义了各种数据格式，如R8、RG8、RGBA8等。
- FormatType: 定义了格式类型，如无符号整数、浮点数等。
- Type: 定义了数据类型，如布尔、整数、浮点数、矩阵等。
- BufferUsageBit: 定义了缓冲区的使用位。
- BufferFlagBit: 定义了缓冲区的标志位。
- MemoryAccessBit: 定义了内存访问位。
- MemoryUsageBit: 定义了内存使用位。
- TextureType: 定义了纹理类型，如1D、2D、3D、立方体等。
- TextureUsageBit: 定义了纹理的使用位。
- TextureFlagBit: 定义了纹理的标志位。
- FormatFeatureBit: 定义了格式特性位。
- SampleCount: 定义了采样数。
- VsyncMode: 定义了垂直同步模式，如关闭、开启、放松等。
- Filter: 定义了过滤模式，如点过滤、线性过滤等。
- Address: 定义了地址模式，如环绕、镜像、钳制等。
- ComparisonFunc: 定义了比较函数，如从不、小于、等于等。
- StencilOp: 定义了模板操作，如保持、替换、增加等。
- BlendFactor: 定义了混合因子，如源颜色、目标颜色等。
- BlendOp: 定义了混合操作，如相加、相减等。
- ColorMask: 定义了颜色掩码。
- ShaderStageFlagBit: 定义了着色器阶段标志位。
- LoadOp: 定义了加载操作，如加载、清除、丢弃。
- StoreOp: 定义了存储操作，如存储、丢弃。
- AccessFlagBit: 定义了访问标志位。
- ResolveMode: 定义了解决模式，如无、样本零、平均等。
- PipelineBindPoint: 定义了管线绑定点，如图形、计算、光线追踪。
- PrimitiveMode: 定义了图元模式，如点列表、线列表、三角形列表等。
- PolygonMode: 定义了多边形模式，如填充、点、线。
- ShadeModel: 定义了着色模型，如Gouraud、平面。
- CullMode: 定义了剔除模式，如无、前、后。
- DynamicStateFlagBit: 定义了动态状态标志位。
- StencilFace: 定义了模板面。
- DescriptorType: 定义了描述符类型。
- QueueType: 定义了队列类型，如图形、计算、传输。
- QueryType: 定义了查询类型，如遮挡、管线统计、时间戳。
- CommandBufferType: 定义了命令缓冲区类型，如主、次。
- ClearFlagBit: 定义了清除标志位。
- BarrierType: 定义了屏障类型，如全屏障、分割开始、分割结束。
- PassType: 定义了通道类型，如光栅、计算、复制、移动、光线追踪、呈现。

##### **类**

- Size: 定义了尺寸类。
- DeviceCaps: 定义了设备能力类，包含设备的各种能力参数。
- DeviceOptions: 定义了设备选项类。
- Offset: 定义了偏移类。
- Rect: 定义了矩形类。
- Extent: 定义了范围类。
- TextureSubresLayers: 定义了纹理子资源层类。
- TextureSubresRange: 定义了纹理子资源范围类。
- TextureCopy: 定义了纹理复制类。
- TextureBlit: 定义了纹理混合类。
- BufferTextureCopy: 定义了缓冲区纹理复制类。
- Viewport: 定义了视口类。
- Color: 定义了颜色类。
- BindingMappingInfo: 定义了绑定映射信息类。
- SwapchainInfo: 定义了交换链信息类。
- DeviceInfo: 定义了设备信息类。
- BufferInfo: 定义了缓冲区信息类。
- BufferViewInfo: 定义了缓冲区视图信息类。
- DrawInfo: 定义了绘制信息类。
- DispatchInfo: 定义了调度信息类。
- IndirectBuffer: 定义了间接缓冲区类。
- TextureInfo: 定义了纹理信息类。
- TextureViewInfo: 定义了纹理视图信息类。
- SamplerInfo: 定义了采样器信息类。
- Uniform: 定义了统一变量类。
- UniformBlock: 定义了统一变量块类。
- UniformSamplerTexture: 定义了统一采样器纹理类。
- UniformSampler: 定义了统一采样器类。
- UniformTexture: 定义了统一纹理类。
- UniformStorageImage: 定义了统一存储图像类。
- UniformStorageBuffer: 定义了统一存储缓冲区类。
- UniformInputAttachment: 定义了统一输入附件类。
- ShaderStage: 定义了着色器阶段类。
- Attribute: 定义了属性类。
- ShaderInfo: 定义了着色器信息类。
- InputAssemblerInfo: 定义了输入汇编器信息类。
- ColorAttachment: 定义了颜色附件类。
- DepthStencilAttachment: 定义了深度模板附件类。
- SubpassInfo: 定义了子通道信息类。
- SubpassDependency: 定义了子通道依赖类。
- RenderPassInfo: 定义了渲染通道信息类。
- GeneralBarrierInfo: 定义了一般屏障信息类。
- TextureBarrierInfo: 定义了纹理屏障信息类。
- BufferBarrierInfo: 定义了缓冲区屏障信息类。
- FramebufferInfo: 定义了帧缓冲区信息类。
- DescriptorSetLayoutBinding: 定义了描述符集布局绑定类。
- DescriptorSetLayoutInfo: 定义了描述符集布局信息类。
- DescriptorSetInfo: 定义了描述符集信息类。
- PipelineLayoutInfo: 定义了管线布局信息类。
- InputState: 定义了输入状态类。
- CommandBufferInfo: 定义了命令缓冲区信息类。
- QueueInfo: 定义了队列信息类。
- QueryPoolInfo: 定义了查询池信息类。
- FormatInfo: 定义了格式信息类。
- MemoryStatus: 定义了内存状态类。
- DynamicStencilStates: 定义了动态模板状态类。
- DynamicStates: 定义了动态状态类。
- GFXObject: 定义了图形对象类，继承自GCObject。

##### **接口**

- ISwapchainTextureInfo: 定义了交换链纹理信息接口。
- 类型别名
- BufferUsage: 缓冲区使用位的类型别名。
- BufferFlags: 缓冲区标志位的类型别名。
- MemoryAccess: 内存访问位的类型别名。
- MemoryUsage: 内存使用位的类型别名。
- TextureUsage: 纹理使用位的类型别名。
- TextureFlags: 纹理标志位的类型别名。
- FormatFeature: 格式特性位的类型别名。
- ShaderStageFlags: 着色器阶段标志位的类型别名。
- AccessFlags: 访问标志位的类型别名。
- DynamicStateFlags: 动态状态标志位的类型别名。
- ClearFlags: 清除标志位的类型别名。

反正就是定义了一些图形相关的类型&类。