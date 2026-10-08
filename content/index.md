---
title: Pamphlet
---

# {{ title }}

<p class="drop">Once upon a time, in a land far away, there lived a writer who had a story to tell.</p>

## Contents

<ol class="toc">
{%- for chapter in collections.chapters %}
<li><time datetime="{{ chapter.date.toISOString().slice(0,10) }}">{{ chapter.date.toISOString().slice(0,10) }}</time><a href="{{ chapter.url }}">{{ chapter.data.title }}</a>{% if chapter.data.description %}<p class="dek">{{ chapter.data.description }}</p>{% endif %}</li>
{%- endfor %}
</ol>
