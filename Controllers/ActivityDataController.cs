﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivityTrackerAPI;
using ActivityTrackerAPI.Models;
using System.Reflection.Metadata.Ecma335;

namespace ActivityTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityDataController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityData>>> GetActivityData()
        {
            return await _context.ActivityData.ToListAsync();
        }

        // GET: api/ActivityData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityData>> GetActivityData(int id)
        {
            var activityData = await _context.ActivityData.FindAsync(id);

            if (activityData == null)
            {
                return NotFound();
            }

            return activityData;
        }

        // GET: api/ActivityData/UserID
        [HttpGet("user/{UserID}")]
        public async Task<ActionResult<IEnumerable<ActivityData>>> getUserActivitityData(int UserID)
        {
            var activityData = await _context.ActivityData.Where(a => a.UserID == UserID).ToListAsync();
            if (activityData == null)
            {
                return NotFound();
            }
            return activityData;
        }

        // PUT: api/ActivityData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityData(int id, ActivityData activityData)
        {
            if (id != activityData.ID)
            {
                return BadRequest();
            }

            _context.Entry(activityData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ActivityData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> CreateActivityData([FromBody] ActivityData activityData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Sprawdzanie czy użytkownik istnieje
            var user = await _context.Users.FindAsync(activityData.UserID);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Powiązanie aktywności z użytkownikiem
            activityData.User = user;

            _context.ActivityData.Add(activityData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityData", new { id = activityData.ID }, activityData);
        }

        [HttpGet("check-if-exists")]
        public async Task<ActionResult<bool>> CheckIfRecordExists()
        { 
            var today = DateTime.Today;
            var recordExists = await _context.ActivityData.AnyAsync(a => a.Date.Date == today);

            if (recordExists)
            {
                return true;
            }
            else 
            {
                return false;
            }
        }

        [HttpGet("GetID")]
        public async Task<ActionResult<int>> GetTodaysRecordID()
        {
            var today = DateTime.Today;
            var record = await _context.ActivityData.Where(r => EF.Functions.DateDiffDay(r.Date, today) == 0).FirstOrDefaultAsync();
            if(record == null)
            {
                return NotFound();
            }

            return Ok(record.ID);
        }

        // DELETE: api/ActivityData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityData(int id)
        {
            var activityData = await _context.ActivityData.FindAsync(id);
            if (activityData == null)
            {
                return NotFound();
            }

            _context.ActivityData.Remove(activityData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityDataExists(int id)
        {
            return _context.ActivityData.Any(e => e.ID == id);
        }
    }
}
