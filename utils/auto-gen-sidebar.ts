import * as path from 'node:path';  
import * as fs from 'node:fs';  
// 文件根目录  
const DIR_PATH: string = path.resolve();  
// 白名单,过滤不是文章的文件和文件夹  
const WHITE_LIST: string[] = [  
  'index.md',  
  '.vitepress',  
  'node_modules',  
  '.idea',  
  'assets',  
];  
  
// 判断是否是文件夹  
const isDirectory = (path: string): boolean => fs.lstatSync(path).isDirectory();  
  
// 取差值  
const intersections = <T>(arr1: T[], arr2: T[]): T[] =>  
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));  
  
// 获取文件/文件夹列表  
function getList(params: string[], path1: string, pathname: string): { text: string; link?: string; collapsed?: boolean; items?: any[] }[] {  
  const res: { text: string; link?: string; collapsed?: boolean; items?: any[] }[] = [];  
  for (let file of params) {  
    const dir: string = path.join(path1, file);  
    const isDir: boolean = isDirectory(dir);  
    if (isDir) {  
      const files: string[] = fs.readdirSync(dir);  
      res.push({  
        text: file,  
        collapsed: false,  
        items: getList(files, dir, `${pathname}/${file}`),  
      });  
    } else {  
      const name: string = path.basename(file);  
      const suffix: string = path.extname(file);  
      if (suffix !== '.md') {  
        continue;  
      }  
      res.push({  
        text: name,  
        link: `${pathname}/${name}`,  
      });  
    }  
  }  
  res.forEach((item) => {  
    item.text = item.text.replace(/\.md$/, '');  
  });  
  return res;  
}  
  
// 设置侧边栏  
export const set_sidebar = (pathname: string): { text: string; link?: string; collapsible?: boolean; items?: any[] }[] => {  
  const dirPath: string = path.join(DIR_PATH, pathname);  
  const files: string[] = fs.readdirSync(dirPath);  
  const items: string[] = intersections(files, WHITE_LIST);  
  return getList(items, dirPath, pathname);  
};