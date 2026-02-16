## Section (formatting)

Write **bold**, *italic*, ***bold italic***, ~~strikethrough~~, or <u>underline</u> (HTML),
Escape: \*,
Link: [a link](https://mwt.me).

### 1.1. Subsection

Sections aren't auto-numbered. Number manually.

#### 1.1.1. Subsubsection (lists and code)

Heading levels go down to `######`.

##### Supported:
* Tables
* Math in TeX form with `$$`,`$`
* Environments for theorems, proofs, and definitions

##### *Not* supported:
1. Footnotes
2. `{.class #id}` attributes
   * Use HTML instead
3. Code syntax highlighting

---

#### 1.1.2. Tables

| Tables       | Are       | Supported     |
| ------------ | --------- | ------------- |
| this table   | cool      | *italic*      |
| other tables | also cool | **bold**      |
| no tables    | bad       | ~~alignment~~ |

---

#### 1.1.3. Code blocks

```
def f(x):
   return "f(" + str(x) + ")"
```

---

#### 1.1.4. Math

Use `$$` for display math and `$` for inline math. E.g.,

$$
\int_0^1 f(x)\,dx = \lim_{n\to\infty} \sum_{t=1}^n f \left( \frac{t}{n} \right) \frac{1}{n}
$$

holds for any continuous $f$ on $[0,1]$.

---

#### 1.1.5. Theorems and proofs

<div class=theorem>
The area of a unit right triangle is given by

$$
\int_0^1 x\,dx = \frac{1}{2}.
$$
</div>

<div class=proof>
Recall for any continuous function,

$$
\int_0^1 f(x)\,dx = \lim_{n\to\infty} \sum_{t=1}^n f \left( \frac{t}{n} \right) \frac{1}{n}.
$$

Then,

$$
\begin{align*}
   \int_0^1 x\,dx &= \lim_{n\to\infty} \sum_{t=1}^n \frac{t}{n} \frac{1}{n} \\
                  &= \lim_{n\to\infty} \frac{1}{n^2} \cdot \sum_{t=1}^n t \\
                  &= \lim_{n\to\infty} \frac{1}{n^2} \cdot \frac{n(n+1)}{2} \\
                  &= \lim_{n\to\infty} \frac{n^2 + n}{2n^2} \\
                  &= \lim_{n\to\infty} \left( \frac{1}{2} + \frac{1}{2n} \right) = \frac{1}{2}.
\end{align*}
$$
</div>