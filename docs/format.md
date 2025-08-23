# Markdown Formatting Guide

This guide covers the most commonly used Markdown syntax with examples for MkDocs with the ReadTheDocs theme.

## Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

**Result:**

**H1 Header** (largest)  
**H2 Header** (large)  
**H3 Header** (medium)  
**H4 Header** (small)  
**H5 Header** (smaller)  
**H6 Header** (smallest)

---

## Text Formatting

### Basic Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

**Result:**

**Bold text**  
*Italic text*  
***Bold and italic***  
~~Strikethrough~~  
`Inline code`

### Paragraphs and Line Breaks

```markdown
This is a paragraph.

This is another paragraph separated by a blank line.

This line ends with two spaces  
and continues on the next line.
```

**Result:**

This is a paragraph.

This is another paragraph separated by a blank line.

This line ends with two spaces  
and continues on the next line.

---

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

* Alternative bullet
* Another item
```

**Result:**

- Item 1
- Item 2
    - Nested item 2.1
    - Nested item 2.2
- Item 3

* Alternative bullet
* Another item

### Ordered Lists

```markdown
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
```

**Result:**

1. First item
2. Second item
    1. Nested item 2.1
    2. Nested item 2.2
3. Third item

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
```

**Result:**

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

---

## Links and Images

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "This is a title")
[Internal link](index.md)
<https://example.com>
```

**Result:**

[Link text](https://example.com)  
[Link with title](https://example.com "This is a title")  
[Internal link](index.md)  
<https://example.com>

### Images

```markdown
![Alt text](img/favicon.ico)
![Alt text](img/favicon.ico "Image title")
```

**Result:**

![Alt text](img/favicon.ico)
![Alt text](img/favicon.ico "Image title")

---

## Code

### Inline Code

```markdown
Use `backticks` for inline code like `print("Hello")`.
```

**Result:**

Use `backticks` for inline code like `print("Hello")`.

### Code Blocks

**Syntax:**

````markdown
```python
def hello_world():
    print("Hello, World!")
    return True
```
````

**Result:**

```python
def hello_world():
    print("Hello, World!")
    return True
```

**More examples:**

```javascript
function helloWorld() {
    console.log("Hello, World!");
    return true;
}
```

```bash
# Bash commands
ls -la
cd /path/to/directory
```

```yaml
# YAML example
site_name: My Docs
nav:
  - Home: index.md
  - About: about.md
```

---

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More data|
| Row 2    | Data     | More data|

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
```

**Result:**

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More data|
| Row 2    | Data     | More data|

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |

---

## Admonitions (Info Boxes)

MkDocs supports admonitions for creating styled info boxes, warnings, tips, and notes.

### Basic Admonitions

```markdown
!!! note
    This is a note admonition.

!!! tip
    This is a helpful tip!

!!! warning
    This is a warning message.

!!! danger
    This is a danger alert!

!!! info
    This is an info box.

!!! success
    This indicates success!

!!! failure
    This indicates failure.

!!! question
    This is a question box.

!!! example
    This is an example box.

!!! quote
    This is a quote box.
```

**Result:**

!!! note
    This is a note admonition.

!!! tip
    This is a helpful tip!

!!! warning
    This is a warning message.

!!! danger
    This is a danger alert!

!!! info
    This is an info box.

!!! success
    This indicates success!

!!! failure
    This indicates failure.

!!! question
    This is a question box.

!!! example
    This is an example box.

!!! quote
    This is a quote box.

### Custom Titles

```markdown
!!! note "Custom Note Title"
    You can customize the title of any admonition.

!!! warning "Important Warning"
    Make sure to read this carefully!
```

**Result:**

!!! note "Custom Note Title"
    You can customize the title of any admonition.

!!! warning "Important Warning"
    Make sure to read this carefully!

### Collapsible Admonitions

```markdown
??? note "Click to expand"
    This content is hidden by default.

!!! note "Always visible"
    This content is always visible.

???+ tip "Expanded by default"
    This starts expanded but can be collapsed.
```

**Result:**

??? note "Click to expand"
    This content is hidden by default.

!!! note "Always visible"
    This content is always visible.

???+ tip "Expanded by default"
    This starts expanded but can be collapsed.

### Admonitions with Multiple Paragraphs

```markdown
!!! info "Complex Content"
    You can include multiple paragraphs in admonitions.
    
    - Lists work too
    - Second item
    
    ```python
    # Code blocks are supported
    def example():
        return "Hello"
    ```
    
    Even **formatting** and [links](https://example.com) work!
```

**Result:**

!!! info "Complex Content"
    You can include multiple paragraphs in admonitions.
    
    - Lists work too
    - Second item
    
    ```python
    # Code blocks are supported
    def example():
        return "Hello"
    ```
    
    Even **formatting** and [links](https://example.com) work!

---

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.

> Blockquotes can be nested
>> Like this

> You can use **formatting** inside blockquotes
> 
> - And lists
> - Like this
```

**Result:**

> This is a blockquote.
> It can span multiple lines.

> Blockquotes can be nested
>> Like this

> You can use **formatting** inside blockquotes
> 
> - And lists
> - Like this

---

## Horizontal Rules

```markdown
---
***
___
```

**Result:**

---
***
___

---

## HTML Elements

The ReadTheDocs theme supports basic HTML elements:

```markdown
You can use <strong>HTML tags</strong> in Markdown.

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<mark>Highlighted text</mark>

<small>Small text</small>
```

**Result:**

You can use <strong>HTML tags</strong> in Markdown.

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<mark>Highlighted text</mark>

<small>Small text</small>

---

## Escaping Characters

```markdown
\*This text is not italic\*
\# This is not a header
\[This is not a link\]
\`This is not code\`
```

**Result:**

\*This text is not italic\*  
\# This is not a header  
\[This is not a link\]  
\`This is not code\`

---

## MkDocs Features for ReadTheDocs Theme

### Navigation

Internal navigation uses relative paths:

```markdown
[Go to Home](index.md)
[Go to About](about.md)
[Link to section](format.md#headers)
```

### Automatic Table of Contents

The ReadTheDocs theme automatically generates a table of contents in the sidebar based on your headers.

### Search

The ReadTheDocs theme includes built-in search functionality that indexes all your content.

---

## Best Practices for ReadTheDocs Theme

1. **Use clear header hierarchy** - The theme generates navigation from headers
2. **Keep file names simple** - Use lowercase with hyphens: `my-guide.md`
3. **Use relative links** for internal navigation
4. **Add descriptive alt text** to images
5. **Test locally** with `mkdocs serve` before deploying
6. **Use consistent formatting** throughout your documentation
7. **Keep lines under 100 characters** for better readability

## ReadTheDocs Theme Specific Notes

- **Code highlighting** works with the languages configured in `mkdocs.yml`
- **Search** is automatically enabled and indexes all content
- **Navigation** is generated from the `nav` section in `mkdocs.yml`
- **Mobile responsive** design is built-in
- **Print-friendly** styling is included

## Common Mistakes to Avoid

- Don't use absolute paths for internal links
- Don't forget blank lines around code blocks and headers
- Don't mix different list styles in the same document
- Don't use complex HTML that might not render properly
- Don't forget to update navigation in `mkdocs.yml` when adding pages

---

## Supported Languages for Code Highlighting

Based on your `mkdocs.yml` configuration, these languages are highlighted:

- `yaml` / `yml`
- `rust`
- `python` / `py`
- `c`
- `cpp` / `c++`
- `java`
- `bash` / `shell`
- `json`
- `markdown` / `md`

Example:
```rust
fn main() {
    println!("Hello, world!");
}
```

---

This guide covers the essential Markdown syntax optimized for MkDocs with the ReadTheDocs theme. All examples are tested and work correctly with this setup.
