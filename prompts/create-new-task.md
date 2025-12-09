# Create New Task Working Directory

## Purpose
This prompt helps create a new task working directory with proper structure and metadata tracking for rajnishdashora.com website development.

## Task Directory Structure

```
tasks/
└── <task-id>-<task-description>/
    └── README.md
```

## Naming Convention
- **Format**: `<task-id>-<task-description>`
- **Task ID**: Auto-incrementing number starting from 1
- **Task Description**: Short, kebab-case description of the task
- **Example**: `1-implement-google-analytics`, `2-add-contact-form`, `3-seo-optimization`

## Task ID Management
Task IDs are sequential numbers that auto-increment. To find the next available ID:
1. List all task directories in `tasks/`
2. Find the highest task ID currently in use
3. Increment by 1 for the new task

## README.md Template

Each task directory must contain a `README.md` with the following structure:

```markdown
# Task: <Task Description>

**Task ID**: <task-id>
**Created**: YYYY-MM-DD
**Status**: [Planning | In Progress | Completed | On Hold | Cancelled]

## Description
Brief description of what this task aims to accomplish for the website.

## Scope
- What is included in this task
- What is NOT included in this task

## Objectives
1. Objective 1
2. Objective 2
3. Objective 3

## Technical Requirements
- Framework/Library requirements
- Dependencies to install
- Configuration changes needed

## Working Directory
This directory serves as the working space for all artifacts and interim work related to this task. Once completed, final artifacts should be moved to their respective permanent locations in the website codebase.

## Artifacts
List of files/documents created during this task:
- `research.md` - Research notes and findings
- `implementation-plan.md` - Step-by-step implementation plan
- `code-snippets.md` - Code snippets and examples

## Final Deliverables
Location of final published artifacts:
- `/src/components/ComponentName.tsx` - Description
- `/src/utils/utilName.ts` - Description

## Testing
- [ ] Manual testing completed
- [ ] Works in development environment
- [ ] Works in production build
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive

## Deployment
- [ ] Changes committed to git
- [ ] Changes pushed to GitHub
- [ ] CI/CD pipeline passed
- [ ] Deployed to production

## Notes
Any additional notes, references, or context.

## References
- Link to documentation
- Link to design mockups
- Link to related issues
```

## Usage Instructions

### Creating a New Task

1. **Determine Next Task ID**
   ```bash
   # Find the highest task ID
   ls tasks/ 2>/dev/null | grep -Eo '^[0-9]+' | sort -n | tail -1
   # Add 1 to get the next ID
   ```

2. **Create Task Directory**
   ```bash
   mkdir -p "tasks/<task-id>-<task-description>"
   ```

3. **Create README.md**
   - Copy the template above
   - Fill in task details:
     - Task ID
     - Created date (today's date: 2025-12-09)
     - Description and scope
     - Objectives
     - Technical requirements
   - Set initial status to "Planning" or "In Progress"

4. **Start Working**
   - Use this directory for all interim work
   - Create research docs, implementation plans, code snippets
   - Update README.md as the task progresses

5. **Complete Task**
   - Move final code to appropriate locations in src/
   - Update README.md with final deliverable locations
   - Check off all testing and deployment items
   - Set status to "Completed"
   - Document where everything was published

## Example Workflow

```bash
# 1. Find next task ID
LAST_ID=$(ls tasks/ 2>/dev/null | grep -Eo '^[0-9]+' | sort -n | tail -1)
NEXT_ID=$((${LAST_ID:-0} + 1))

# 2. Create new task directory
mkdir -p "tasks/${NEXT_ID}-implement-google-analytics"

# 3. Create README.md with the template
# (Use your editor to fill in the template)

# 4. Start working in the task directory
cd "tasks/${NEXT_ID}-implement-google-analytics"
```

## Best Practices

1. **Keep Task Scope Focused**: Each task should have a clear, achievable scope
2. **Update README Regularly**: Keep the README up-to-date as work progresses
3. **Document Decisions**: Use the Notes section to capture why certain decisions were made
4. **Test Thoroughly**: Check off all testing items before marking complete
5. **Clean Up**: Once completed, clean up interim files and only keep what's necessary for reference
6. **Link Related Tasks**: Reference other task IDs in notes when tasks are related
7. **Use Status Effectively**: Update status to reflect current state accurately
8. **Commit Often**: Commit your progress regularly with clear messages

## Task Status Definitions

- **Planning**: Task is being scoped and planned (research, design, architecture)
- **In Progress**: Active development work is happening
- **Completed**: Task is done, tested, deployed, and deliverables are published
- **On Hold**: Task is paused, waiting on external dependencies or decisions
- **Cancelled**: Task is no longer needed or relevant

## Common Task Types for Website Development

### Feature Implementation
- New components
- New pages
- New functionality

### Enhancement
- Improving existing features
- Performance optimization
- Accessibility improvements

### Bug Fix
- Fixing issues in production
- Addressing user-reported problems

### Infrastructure
- Build system changes
- Deployment configuration
- Analytics and monitoring

### Content
- Writing blog posts
- Updating copy
- Adding images/assets

### SEO & Marketing
- Meta tags optimization
- Sitemap generation
- Social media integration

## Integration with Git

- Task directories can be committed to git for transparency
- Use `.gitignore` to exclude sensitive information
- Reference task IDs in commit messages: `git commit -m "feat: add Google Analytics [Task #1]"`
- Create branches per task: `git checkout -b task-1-google-analytics`

## Notes

- Keep this `prompts/` directory as a reference for all task management workflows
- Tasks folder may be added to `.gitignore` if you prefer to keep work-in-progress private
- Consider creating a `tasks/README.md` as an index of all tasks
