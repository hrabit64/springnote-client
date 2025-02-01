<template>
  <div id="markdown-wrapper" v-html="md.render(content)"></div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  content: string
}>()

import MarkdownIt from 'markdown-it'
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItTasklists from 'markdown-it-task-lists'
import 'highlight.js/styles/github-dark.css'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTasklists)
</script>

<style>
#markdown-wrapper {
  color-scheme: dark;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: #f0f6fc;

  font-family: 'JetBrains Mono', 'D2coding', monospace;
  font-size: 1rem;
  line-height: 2.5;
  word-wrap: break-word;
}

#markdown-wrapper .octicon {
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
}

#markdown-wrapper h1:hover .anchor .octicon-link:before,
#markdown-wrapper h2:hover .anchor .octicon-link:before,
#markdown-wrapper h3:hover .anchor .octicon-link:before,
#markdown-wrapper h4:hover .anchor .octicon-link:before,
#markdown-wrapper h5:hover .anchor .octicon-link:before,
#markdown-wrapper h6:hover .anchor .octicon-link:before {
  width: 16px;
  height: 16px;
  content: ' ';
  display: inline-block;
  background-color: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
}

#markdown-wrapper details,
#markdown-wrapper figcaption,
#markdown-wrapper figure {
  display: block;
}

#markdown-wrapper summary {
  display: list-item;
}

#markdown-wrapper [hidden] {
  display: none !important;
}

#markdown-wrapper a {
  background-color: transparent;
  color: #43a047;
  text-decoration: none;
  border-color: #43a047;
  border: 1px solid #43a047;
  padding: 0.2em 0.4em;
  margin: 0;
  border-radius: 6px;
}

#markdown-wrapper a::before {
  content: '\F0339'; /* MDI link-variant 아이콘 코드 */
  font-family: 'Material Design Icons'; /* MDI 폰트 패밀리 */
  margin-right: 5px; /* 아이콘과 텍스트 사이의 여백 */
}

#markdown-wrapper abbr[title] {
  border-bottom: none;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

#markdown-wrapper b,
#markdown-wrapper strong {
  font-weight: 600;
}

#markdown-wrapper dfn {
  font-style: italic;
}

#markdown-wrapper h1 {
  margin: 0.67em 0;
  font-weight: 600;
  padding-bottom: 0.3em;
  font-size: 2em;
  color: #43a047;
  border-bottom: 1px solid #3d444db3;
}

#markdown-wrapper mark {
  background-color: transparent;
  color: inherit;
}

#markdown-wrapper small {
  font-size: 90%;
}

#markdown-wrapper sub,
#markdown-wrapper sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

#markdown-wrapper sub {
  bottom: -0.25em;
}

#markdown-wrapper sup {
  top: -0.5em;
}

#markdown-wrapper img {
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
  margin: auto;
  display: block;
}

#markdown-wrapper code,
#markdown-wrapper kbd,
#markdown-wrapper pre,
#markdown-wrapper samp {
  font-family: 'JetBrains Mono', 'D2coding', monospace;
  font-size: 1em;
  font-variant-ligatures: none;
}

#markdown-wrapper figure {
  margin: 1em 2.5rem;
}

#markdown-wrapper hr {
  box-sizing: content-box;
  overflow: hidden;
  background: transparent;
  border-bottom: 1px solid #3d444db3;
  height: 0.25em;
  padding: 0;
  margin: 1.5rem 0;
  background-color: #3d444d;
  border: 0;
}

#markdown-wrapper input {
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

#markdown-wrapper [type='button'],
#markdown-wrapper [type='reset'],
#markdown-wrapper [type='submit'] {
  -webkit-appearance: button;
  appearance: button;
}

#markdown-wrapper [type='checkbox'],
#markdown-wrapper [type='radio'] {
  box-sizing: border-box;
  padding: 0;
}

#markdown-wrapper [type='number']::-webkit-inner-spin-button,
#markdown-wrapper [type='number']::-webkit-outer-spin-button {
  height: auto;
}

#markdown-wrapper [type='search']::-webkit-search-cancel-button,
#markdown-wrapper [type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

#markdown-wrapper ::-webkit-input-placeholder {
  color: inherit;
  opacity: 0.54;
}

#markdown-wrapper ::-webkit-file-upload-button {
  -webkit-appearance: button;
  appearance: button;
  font: inherit;
}

#markdown-wrapper a:hover {
  text-decoration: none;
}

#markdown-wrapper ::placeholder {
  color: #9198a1;
  opacity: 1;
}

#markdown-wrapper hr::before {
  display: table;
  content: '';
}

#markdown-wrapper hr::after {
  display: table;
  clear: both;
  content: '';
}

#markdown-wrapper table {
  border-radius: 10px;
  border-spacing: 0;
  border: 1px solid #424242;
  border-collapse: collapse;
  display: block;
  width: max-content;
  margin: auto;
  text-align: center;

  max-width: 100%;
  overflow: auto;
  font-variant: tabular-nums;
}

#markdown-wrapper td,
#markdown-wrapper th {
  padding: 0;
}

#markdown-wrapper details summary {
  cursor: pointer;
}

#markdown-wrapper a:focus,
#markdown-wrapper [role='button']:focus,
#markdown-wrapper input[type='radio']:focus,
#markdown-wrapper input[type='checkbox']:focus {
  outline: 2px solid #1f6feb;
  outline-offset: -2px;
  box-shadow: none;
}

#markdown-wrapper a:focus:not(:focus-visible),
#markdown-wrapper [role='button']:focus:not(:focus-visible),
#markdown-wrapper input[type='radio']:focus:not(:focus-visible),
#markdown-wrapper input[type='checkbox']:focus:not(:focus-visible) {
  outline: solid 1px transparent;
}

#markdown-wrapper a:focus-visible,
#markdown-wrapper [role='button']:focus-visible,
#markdown-wrapper input[type='radio']:focus-visible,
#markdown-wrapper input[type='checkbox']:focus-visible {
  outline: 2px solid #1f6feb;
  outline-offset: -2px;
  box-shadow: none;
}

#markdown-wrapper a:not([class]):focus,
#markdown-wrapper a:not([class]):focus-visible,
#markdown-wrapper input[type='radio']:focus,
#markdown-wrapper input[type='radio']:focus-visible,
#markdown-wrapper input[type='checkbox']:focus,
#markdown-wrapper input[type='checkbox']:focus-visible {
  outline-offset: 0;
}

#markdown-wrapper kbd {
  display: inline-block;
  padding: 0.25rem;
  font:
    11px ui-monospace,
    SFMono-Regular,
    SF Mono,
    Menlo,
    Consolas,
    Liberation Mono,
    monospace;
  line-height: 10px;
  color: #f0f6fc;
  vertical-align: middle;
  background-color: #151b23;
  border: solid 1px #3d444db3;
  border-bottom-color: #3d444db3;
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 #3d444db3;
}

#markdown-wrapper h1,
#markdown-wrapper h2 {
  margin-top: 10rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
}

#markdown-wrapper h3,
#markdown-wrapper h4,
#markdown-wrapper h5,
#markdown-wrapper h6 {
  margin-top: 5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
}

#markdown-wrapper h2 {
  font-weight: 600;
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #3d444db3;
  color: #43a047;
}

#markdown-wrapper h3 {
  font-weight: 600;
  font-size: 1.25em;
  color: #43a047;
}

#markdown-wrapper h4 {
  font-weight: 600;
  font-size: 1em;
  color: #43a047;
}

#markdown-wrapper h5 {
  font-weight: 600;
  font-size: 0.875em;
  color: #43a047;
}

#markdown-wrapper h6 {
  font-weight: 600;
  font-size: 0.85em;
  color: #43a047;
}

#markdown-wrapper p {
  margin-top: 0;
  margin-bottom: 10px;
}

#markdown-wrapper blockquote {
  margin: 0;
  padding: 0 2em;
  color: #43a047;
  border-left: 0.25em solid #43a047;

  border-radius: 6px;
  font-weight: 700;
}

#markdown-wrapper ul,
#markdown-wrapper ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

#markdown-wrapper ol ol,
#markdown-wrapper ul ol {
  list-style-type: lower-roman;
}

#markdown-wrapper ul ul ol,
#markdown-wrapper ul ol ol,
#markdown-wrapper ol ul ol,
#markdown-wrapper ol ol ol {
  list-style-type: lower-alpha;
}

#markdown-wrapper dd {
  margin-left: 0;
}

#markdown-wrapper tt,
#markdown-wrapper code,
#markdown-wrapper samp {
  font-family: 'JetBrains Mono', 'D2coding', monospace;
  font-size: 12px;
}

#markdown-wrapper pre {
  margin-top: 0;
  margin-bottom: 0;

  overflow-x: scroll;
  font-variant-ligatures: none;
  font-family: 'JetBrains Mono', 'D2coding', monospace !important;
  font-size: 16px;
  word-wrap: normal;

  /* width */
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #222222;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(55, 55, 55);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

#markdown-wrapper .octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

#markdown-wrapper input::-webkit-outer-spin-button,
#markdown-wrapper input::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

#markdown-wrapper .mr-2 {
  margin-right: 0.5rem !important;
}

#markdown-wrapper::before {
  display: table;
  content: '';
}

#markdown-wrapper::after {
  display: table;
  clear: both;
  content: '';
}

#markdown-wrapper > *:first-child {
  margin-top: 0 !important;
}

#markdown-wrapper > *:last-child {
  margin-bottom: 0 !important;
}

#markdown-wrapper a:not([href]) {
  color: inherit;
  text-decoration: none;
}

#markdown-wrapper .absent {
  color: #f85149;
}

#markdown-wrapper .anchor {
  float: left;
  padding-right: 0.25rem;
  margin-left: -20px;
  line-height: 1;
}

#markdown-wrapper .anchor:focus {
  outline: none;
}

#markdown-wrapper p,
#markdown-wrapper blockquote,
#markdown-wrapper ul,
#markdown-wrapper ol,
#markdown-wrapper dl,
#markdown-wrapper table,
#markdown-wrapper pre,
#markdown-wrapper details {
  margin-top: 0;
  margin-bottom: 1rem;
}

#markdown-wrapper blockquote > :first-child {
  margin-top: 0;
}

#markdown-wrapper blockquote > :last-child {
  margin-bottom: 0;
}

#markdown-wrapper h1 .octicon-link,
#markdown-wrapper h2 .octicon-link,
#markdown-wrapper h3 .octicon-link,
#markdown-wrapper h4 .octicon-link,
#markdown-wrapper h5 .octicon-link,
#markdown-wrapper h6 .octicon-link {
  color: #f0f6fc;
  vertical-align: middle;
  visibility: hidden;
}

#markdown-wrapper h1:hover .anchor,
#markdown-wrapper h2:hover .anchor,
#markdown-wrapper h3:hover .anchor,
#markdown-wrapper h4:hover .anchor,
#markdown-wrapper h5:hover .anchor,
#markdown-wrapper h6:hover .anchor {
  text-decoration: none;
}

#markdown-wrapper h1:hover .anchor .octicon-link,
#markdown-wrapper h2:hover .anchor .octicon-link,
#markdown-wrapper h3:hover .anchor .octicon-link,
#markdown-wrapper h4:hover .anchor .octicon-link,
#markdown-wrapper h5:hover .anchor .octicon-link,
#markdown-wrapper h6:hover .anchor .octicon-link {
  visibility: visible;
}

#markdown-wrapper h1 tt,
#markdown-wrapper h1 code,
#markdown-wrapper h2 tt,
#markdown-wrapper h2 code,
#markdown-wrapper h3 tt,
#markdown-wrapper h3 code,
#markdown-wrapper h4 tt,
#markdown-wrapper h4 code,
#markdown-wrapper h5 tt,
#markdown-wrapper h5 code,
#markdown-wrapper h6 tt,
#markdown-wrapper h6 code {
  padding: 0 0.2em;
  font-size: inherit;
}

#markdown-wrapper summary h1,
#markdown-wrapper summary h2,
#markdown-wrapper summary h3,
#markdown-wrapper summary h4,
#markdown-wrapper summary h5,
#markdown-wrapper summary h6 {
  display: inline-block;
}

#markdown-wrapper summary h1 .anchor,
#markdown-wrapper summary h2 .anchor,
#markdown-wrapper summary h3 .anchor,
#markdown-wrapper summary h4 .anchor,
#markdown-wrapper summary h5 .anchor,
#markdown-wrapper summary h6 .anchor {
  margin-left: -40px;
}

#markdown-wrapper summary h1,
#markdown-wrapper summary h2 {
  padding-bottom: 0;
  border-bottom: 0;
}

#markdown-wrapper ul.no-list,
#markdown-wrapper ol.no-list {
  padding: 0;
  list-style-type: none;
}

#markdown-wrapper ol[type='a s'] {
  list-style-type: lower-alpha;
}

#markdown-wrapper ol[type='A s'] {
  list-style-type: upper-alpha;
}

#markdown-wrapper ol[type='i s'] {
  list-style-type: lower-roman;
}

#markdown-wrapper ol[type='I s'] {
  list-style-type: upper-roman;
}

#markdown-wrapper ol[type='1'] {
  list-style-type: decimal;
}

#markdown-wrapper div > ol:not([type]) {
  list-style-type: decimal;
}

#markdown-wrapper ul ul,
#markdown-wrapper ul ol,
#markdown-wrapper ol ol,
#markdown-wrapper ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

#markdown-wrapper li > p {
  margin-top: 1rem;
}

#markdown-wrapper li + li {
  margin-top: 0.25em;
}

#markdown-wrapper dl {
  padding: 0;
}

#markdown-wrapper dl dt {
  padding: 0;
  margin-top: 1rem;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}

#markdown-wrapper dl dd {
  padding: 0 1rem;
  margin-bottom: 1rem;
}

#markdown-wrapper table th {
  font-weight: 700;
  color: #43a047;
}

#markdown-wrapper table th,
#markdown-wrapper table td {
  padding: 6px 13px;
}
#markdown-wrapper table td {
  border-top: 1px solid #424242;
}

#markdown-wrapper table tr {
  background-color: #212121;
}

/* #markdown-wrapper table tr:nth-child(2n) {
  background-color: #151b23;
} */

#markdown-wrapper table img {
  background-color: transparent;
}

#markdown-wrapper img[align='right'] {
  padding-left: 20px;
}

#markdown-wrapper img[align='left'] {
  padding-right: 20px;
}

#markdown-wrapper .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: transparent;
}

#markdown-wrapper span.frame {
  display: block;
  overflow: hidden;
}

#markdown-wrapper span.frame > span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid #3d444d;
}

#markdown-wrapper span.frame span img {
  display: block;
  float: left;
}

#markdown-wrapper span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: #f0f6fc;
}

#markdown-wrapper span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

#markdown-wrapper span.align-center > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}

#markdown-wrapper span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

#markdown-wrapper span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

#markdown-wrapper span.align-right > span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}

#markdown-wrapper span.align-right span img {
  margin: 0;
  text-align: right;
}

#markdown-wrapper span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}

#markdown-wrapper span.float-left span {
  margin: 13px 0 0;
}

#markdown-wrapper span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}

#markdown-wrapper span.float-right > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

#markdown-wrapper code,
#markdown-wrapper tt {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 100%;
  white-space: break-spaces;
  border-color: #43a047;
  border: 1px solid #43a047;
  border-radius: 6px;
}

#markdown-wrapper code br,
#markdown-wrapper tt br {
  display: none;
}

#markdown-wrapper del code {
  text-decoration: inherit;
}

#markdown-wrapper samp {
  font-size: 85%;
}

#markdown-wrapper pre code {
  font-size: 100%;
}

#markdown-wrapper pre > code {
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

#markdown-wrapper .highlight {
  margin-bottom: 1rem;
}

#markdown-wrapper .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

#markdown-wrapper .highlight pre,
#markdown-wrapper pre {
  padding: 1rem;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  color: #f0f6fc;
  background-color: #212121;
  border-radius: 6px;
}

#markdown-wrapper pre code,
#markdown-wrapper pre tt {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

#markdown-wrapper .csv-data td,
#markdown-wrapper .csv-data th {
  padding: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
}

#markdown-wrapper .csv-data .blob-num {
  padding: 10px 0.5rem 9px;
  text-align: right;
  background: #0d1117;
  border: 0;
}

#markdown-wrapper .csv-data tr {
  border-top: 0;
}

#markdown-wrapper .csv-data th {
  font-weight: 600;
  background: #151b23;
  border-top: 0;
}

#markdown-wrapper [data-footnote-ref]::before {
  content: '[';
}

#markdown-wrapper [data-footnote-ref]::after {
  content: ']';
}

#markdown-wrapper .footnotes {
  font-size: 12px;
  color: #9198a1;
  border-top: 1px solid #3d444d;
}

#markdown-wrapper .footnotes ol {
  padding-left: 1rem;
}

#markdown-wrapper .footnotes ol ul {
  display: inline-block;
  padding-left: 1rem;
  margin-top: 1rem;
}

#markdown-wrapper .footnotes li {
  position: relative;
}

#markdown-wrapper .footnotes li:target::before {
  position: absolute;
  top: calc(0.5rem * -1);
  right: calc(0.5rem * -1);
  bottom: calc(0.5rem * -1);
  left: calc(1.5rem * -1);
  pointer-events: none;
  content: '';
  border: 2px solid #1f6feb;
  border-radius: 6px;
}

#markdown-wrapper .footnotes li:target {
  color: #f0f6fc;
}

#markdown-wrapper .footnotes .data-footnote-backref g-emoji {
  font-family: 'JetBrains Mono', 'D2coding', monospace;
}

#markdown-wrapper body:has(:modal) {
  padding-right: var(--dialog-scrollgutter) !important;
}

#markdown-wrapper .pl-c {
  color: #9198a1;
}

#markdown-wrapper .pl-c1,
#markdown-wrapper .pl-s .pl-v {
  color: #79c0ff;
}

#markdown-wrapper .pl-e,
#markdown-wrapper .pl-en {
  color: #d2a8ff;
}

#markdown-wrapper .pl-smi,
#markdown-wrapper .pl-s .pl-s1 {
  color: #f0f6fc;
}

#markdown-wrapper .pl-ent {
  color: #7ee787;
}

#markdown-wrapper .pl-k {
  color: #ff7b72;
}

#markdown-wrapper .pl-s,
#markdown-wrapper .pl-pds,
#markdown-wrapper .pl-s .pl-pse .pl-s1,
#markdown-wrapper .pl-sr,
#markdown-wrapper .pl-sr .pl-cce,
#markdown-wrapper .pl-sr .pl-sre,
#markdown-wrapper .pl-sr .pl-sra {
  color: #a5d6ff;
}

#markdown-wrapper .pl-v,
#markdown-wrapper .pl-smw {
  color: #ffa657;
}

#markdown-wrapper .pl-bu {
  color: #f85149;
}

#markdown-wrapper .pl-ii {
  color: #f0f6fc;
  background-color: #8e1519;
}

#markdown-wrapper .pl-c2 {
  color: #f0f6fc;
  background-color: #b62324;
}

#markdown-wrapper .pl-sr .pl-cce {
  font-weight: bold;
  color: #7ee787;
}

#markdown-wrapper .pl-ml {
  color: #f2cc60;
}

#markdown-wrapper .pl-mh,
#markdown-wrapper .pl-mh .pl-en,
#markdown-wrapper .pl-ms {
  font-weight: bold;
  color: #1f6feb;
}

#markdown-wrapper .pl-mi {
  font-style: italic;
  color: #f0f6fc;
}

#markdown-wrapper .pl-mb {
  font-weight: bold;
  color: #f0f6fc;
}

#markdown-wrapper .pl-md {
  color: #ffdcd7;
  background-color: #67060c;
}

#markdown-wrapper .pl-mi1 {
  color: #aff5b4;
  background-color: #033a16;
}

#markdown-wrapper .pl-mc {
  color: #ffdfb6;
  background-color: #5a1e02;
}

#markdown-wrapper .pl-mi2 {
  color: #f0f6fc;
  background-color: #1158c7;
}

#markdown-wrapper .pl-mdr {
  font-weight: bold;
  color: #d2a8ff;
}

#markdown-wrapper .pl-ba {
  color: #9198a1;
}

#markdown-wrapper .pl-sg {
  color: #3d444d;
}

#markdown-wrapper .pl-corl {
  text-decoration: underline;
  color: #a5d6ff;
}

#markdown-wrapper [role='button']:focus:not(:focus-visible),
#markdown-wrapper [role='tabpanel'][tabindex='0']:focus:not(:focus-visible),
#markdown-wrapper button:focus:not(:focus-visible),
#markdown-wrapper summary:focus:not(:focus-visible),
#markdown-wrapper a:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

#markdown-wrapper [tabindex='0']:focus:not(:focus-visible),
#markdown-wrapper details-dialog:focus:not(:focus-visible) {
  outline: none;
}

#markdown-wrapper g-emoji {
  display: inline-block;
  min-width: 1ch;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1em;
  font-style: normal !important;
  font-weight: 400;
  line-height: 1;
  vertical-align: -0.075em;
}

#markdown-wrapper g-emoji img {
  width: 1em;
  height: 1em;
}

#markdown-wrapper .task-list-item {
  list-style-type: none;
}

#markdown-wrapper .task-list-item label {
  font-weight: 400;
}

#markdown-wrapper .task-list-item.enabled label {
  cursor: pointer;
}

#markdown-wrapper .task-list-item + .task-list-item {
  margin-top: 0.25rem;
}

#markdown-wrapper .task-list-item .handle {
  display: none;
}

#markdown-wrapper .task-list-item-checkbox {
  margin: 0 0.2em 0.25em -1.4em;
  vertical-align: middle;
}

#markdown-wrapper ul:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em 0.25em 0.2em;
}

#markdown-wrapper ol:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em 0.25em 0.2em;
}

#markdown-wrapper .contains-task-list:hover .task-list-item-convert-container,
#markdown-wrapper
  .contains-task-list:focus-within
  .task-list-item-convert-container {
  display: block;
  width: auto;
  height: 24px;
  overflow: visible;
  clip: auto;
}

#markdown-wrapper ::-webkit-calendar-picker-indicator {
  filter: invert(50%);
}

#markdown-wrapper .markdown-alert {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  color: inherit;
  border-left: 0.25em solid #3d444d;
}

#markdown-wrapper .markdown-alert > :first-child {
  margin-top: 0;
}

#markdown-wrapper .markdown-alert > :last-child {
  margin-bottom: 0;
}

#markdown-wrapper .markdown-alert .markdown-alert-title {
  display: flex;
  font-weight: 500;
  align-items: center;
  line-height: 1;
}

#markdown-wrapper .markdown-alert.markdown-alert-note {
  border-left-color: #1f6feb;
}

#markdown-wrapper .markdown-alert.markdown-alert-note .markdown-alert-title {
  color: #4493f8;
}

#markdown-wrapper .markdown-alert.markdown-alert-important {
  border-left-color: #8957e5;
}

#markdown-wrapper
  .markdown-alert.markdown-alert-important
  .markdown-alert-title {
  color: #ab7df8;
}

#markdown-wrapper .markdown-alert.markdown-alert-warning {
  border-left-color: #9e6a03;
}

#markdown-wrapper .markdown-alert.markdown-alert-warning .markdown-alert-title {
  color: #d29922;
}

#markdown-wrapper .markdown-alert.markdown-alert-tip {
  border-left-color: #238636;
}

#markdown-wrapper .markdown-alert.markdown-alert-tip .markdown-alert-title {
  color: #3fb950;
}

#markdown-wrapper .markdown-alert.markdown-alert-caution {
  border-left-color: #da3633;
}

#markdown-wrapper .markdown-alert.markdown-alert-caution .markdown-alert-title {
  color: #f85149;
}

#markdown-wrapper > *:first-child > .heading-element:first-child {
  margin-top: 0 !important;
}

#markdown-wrapper .highlight pre:has(+ .zeroclipboard-container) {
  min-height: 52px;
}
</style>
