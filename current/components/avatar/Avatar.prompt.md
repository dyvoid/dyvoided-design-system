Identity in a list, a comment, or a titlebar — collaborators, git authors, account menus.

Initials fall back to a tint derived from the name, drawn from the four identity colors (`--primary`, `--accent-1..3`) so a roster is varied without new hues; pass `tint` to pin one. `square` for non-person entities (projects, bots). `status` adds a functional-colored dot. `AvatarGroup` overlaps up to `max` and counts the rest in mono.

```jsx
<AvatarGroup max={3}>
  <Avatar name="Mara Oyelaran" status="online" />
  <Avatar name="Tobias Kew" src="/img/tk.jpg" />
  <Avatar name="Aya Lindqvist" />
  <Avatar name="Devin Roe" />
</AvatarGroup>
```
