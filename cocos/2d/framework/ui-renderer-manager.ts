/*
 Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { DEBUG } from 'internal:constants';
import { assert, js } from '../../core';
import { UIMeshRenderer } from '../components';
import { UIRenderer } from './ui-renderer';


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 【WW】note:渲染管理类 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
/**
 * 该类负责管理所有 UIRenderer 和 UIMeshRenderer 实例，以及更新所有脏渲染器。
 * 增加 移除 渲染器，标记脏渲染器，更新所有脏渲染器。
 */
export class UIRendererManager {
    /**
     * 所有被管理的渲染器
     * UIRenderer中的 _internalId 是其在 _allRenderers 数组中的index （从下面代码中推断出来的）
     * 推断：这样做的好处是可以通过id快速找到对应的渲染器，而不用遍历整个数组
     */
    private _allRenderers: (UIRenderer | UIMeshRenderer)[] = [];
    private _dirtyRenderers: (UIRenderer | UIMeshRenderer)[] = [];

    /**
     * 脏渲染器版本号 用于标记脏渲染器 
     * 目前推测：没有实际意义，只是用于标记脏渲染器的版本号
     */
    private _dirtyVersion = 0;

    /**
     * 添加渲染器 往 _allRenderers 数组中添加渲染器，并设置渲染器的 _internalId（看似是一个渲染id(同时也是其在 _allRenderers 数组中的index)）
     */
    public addRenderer (uiRenderer: UIRenderer | UIMeshRenderer): void {
        if (uiRenderer._internalId === -1) {
            uiRenderer._internalId = this._allRenderers.length;
            this._allRenderers.push(uiRenderer);
        }
    }
    /**
     * 移除渲染器 
     * 解释一下 fastRemoveAt 的作用：删除指定位置的元素，但是会改变顺序，原理是：将指定位置的元素与最后一个元素交换，然后删除最后一个元素
     */
    public removeRenderer (uiRenderer: UIRenderer | UIMeshRenderer): void {
        if (uiRenderer._internalId !== -1) {
            if (DEBUG) {
                assert(this._allRenderers[uiRenderer._internalId] === uiRenderer);
            }
            const id = uiRenderer._internalId;
            /**
             * 下面两行代码的意思就是 删除指定元素，修正最后一个元素的 _internalId 确保id 与 index 一一对应
             */
            this._allRenderers[this._allRenderers.length - 1]._internalId = id;
            js.array.fastRemoveAt(this._allRenderers, id);
            uiRenderer._internalId = -1;

            /**
             * 同理 从脏渲染器数组中移除
             */
            if (uiRenderer._dirtyVersion === this._dirtyVersion) {
                js.array.fastRemove(this._dirtyRenderers, uiRenderer);
                uiRenderer._dirtyVersion = -1;
            }
        }
    }

    /**
     * 标记脏点
     */
    public markDirtyRenderer (uiRenderer: UIRenderer | UIMeshRenderer): void {
        if (uiRenderer._dirtyVersion !== this._dirtyVersion && uiRenderer._internalId !== -1) {
            this._dirtyRenderers.push(uiRenderer);
            uiRenderer._dirtyVersion = this._dirtyVersion;
        }
    }


    /**
     * 更新所有脏渲染器
     */
    public updateAllDirtyRenderers (): void {
        const length = this._dirtyRenderers.length;
        const dirtyRenderers = this._dirtyRenderers;
        for (let i = 0; i < length; i++) {
            if (DEBUG) {
                assert(dirtyRenderers[i]._internalId !== -1);
            }
            dirtyRenderers[i].updateRenderer();
        }
        this._dirtyRenderers.length = 0;
        this._dirtyVersion++;
    }
}

export const uiRendererManager = new UIRendererManager();
